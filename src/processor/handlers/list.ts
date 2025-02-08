import { List, ListItem } from "mdast";
import { CustomOptions } from "../toCustom";
import { convertChildren, getTemplate } from "../handlerUtils";

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

    const template = getTemplate(opts.profile.templates.orderedList, opts);

    const children = node.children
        .map((child, idx) => listItem(child, opts, true, idx + start))
        .join("")
        .trimEnd();

    return template
        .replaceAll("$content", children)
        .replaceAll("$start", start + "");
}

/**
 * Convert an unordered list node to string
 * @param node
 * @param opts
 * @returns
 */
function unorderedList(node: List, opts: CustomOptions): string {
    const template = getTemplate(opts.profile.templates.unorderedList, opts);

    const children = node.children
        .map((child) => listItem(child, opts, false))
        .join("")
        .trimEnd();

    return template.replaceAll("$content", children);
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
        .join("\n")
        .trimEnd();

    let template: string;
    if (ordered) {
        const num = index === undefined ? 1 : index;
        template = getTemplate(
            opts.profile.templates.listItemOrdered,
            opts,
        ).replaceAll("$index", num + "");
    } else {
        template = getTemplate(opts.profile.templates.listItemUnordered, opts);
    }

    const indent = " ".repeat(opts.indentation ?? 0);

    return template.replaceAll("$value", content).replaceAll("$indent", indent);
}
