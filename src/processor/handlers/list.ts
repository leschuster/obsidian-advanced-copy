import { List, ListItem } from "mdast";
import { CustomOptions } from "../toCustom";
import {
    convertChildren,
    getTemplate,
    getTemplateWithGlobalAndFrontmatterVariables,
    replaceFrontmatterVariables,
    replaceGlobalVariables,
} from "../utils/handlerUtils";
import { MDTemplateListItem } from "src/settings/settings";
import { modifyOptsBasedOnListIdx } from "../utils/modifyOptsBasedOnListIdx";

const ONE_LEVEL_INDENT = 4;

/**
 * Convert a list node to string
 * @param node
 * @param opts
 * @returns
 */
export function list(node: List, opts: CustomOptions): string {
    if (node.ordered) {
        return orderedList(node, opts);
    } else {
        return unorderedList(node, opts);
    }
}

/**
 * Convert an ordered list node to string
 * @param node
 * @param opts
 * @returns
 */
function orderedList(node: List, opts: CustomOptions): string {
    const start = node.start ?? 1;

    const template = getTemplateWithGlobalAndFrontmatterVariables(
        opts.profile.templates.orderedList,
        opts,
    );

    const content = convertListItems(node.children, opts, true, start);

    return template
        .replaceAll("$content", content.trimEnd())
        .replaceAll("$start", start + "");
}

/**
 * Convert an unordered list node to string
 * @param node
 * @param opts
 * @returns
 */
function unorderedList(node: List, opts: CustomOptions): string {
    const template = getTemplateWithGlobalAndFrontmatterVariables(
        opts.profile.templates.unorderedList,
        opts,
    );

    const content = convertListItems(node.children, opts, false);

    return template.replaceAll("$content", content.trimEnd());
}

function convertListItems(
    children: ListItem[],
    opts: CustomOptions,
    ordered: boolean,
    start: number = 1,
): string {
    let content = "";

    for (const [idx, child] of children.entries()) {
        const childOpts = modifyOptsBasedOnListIdx(opts, idx, children.length);
        content += listItem(child, childOpts, ordered, idx + start);
    }

    return content;
}

function listItem(
    node: ListItem,
    opts: CustomOptions,
    ordered: boolean,
    index?: number,
): string {
    const childOpts = {
        ...opts,
        topLevel: false,
        indentation: (opts.indentation ?? 0) + ONE_LEVEL_INDENT,
    };

    const content = convertChildren(node.children, childOpts)
        .join("")
        .trimEnd();

    let template: string;
    if (ordered) {
        const num = index === undefined ? 1 : index;
        template = getListItemTemplate(
            opts.profile.templates.listItemOrdered,
            opts,
        ).replaceAll("$index", num + "");
    } else {
        template = getListItemTemplate(
            opts.profile.templates.listItemUnordered,
            opts,
        );
    }

    const indent = " ".repeat(opts.indentation ?? 0);

    return template.replaceAll("$value", content).replaceAll("$indent", indent);
}

function getListItemTemplate(
    tmp: string | MDTemplateListItem,
    opts: CustomOptions,
): string {
    if (typeof tmp === "string") {
        return tmp;
    }

    let temp = "";
    switch (true) {
        case tmp.templateFirstChildNested &&
            (opts.indentation ?? 0) > 0 &&
            opts.isFirstChild:
            temp = tmp.templateFirstChildNested;
            break;
        case tmp.templateLastChildNested &&
            (opts.indentation ?? 0) > 0 &&
            opts.isLastChild:
            temp = tmp.templateLastChildNested;
            break;
        default:
            temp = getTemplate(tmp, opts);
    }

    if (opts.globalVars) {
        temp = replaceGlobalVariables(temp, opts.globalVars);
    }
    if (opts.frontmatterVars) {
        temp = replaceFrontmatterVariables(temp, opts.frontmatterVars);
    }

    return temp;
}
