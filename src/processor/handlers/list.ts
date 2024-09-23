import { List, ListItem } from "mdast";
import toCustom, { CustomOptions } from "../toCustom";

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

    const children = node.children
        .map((child, idx) => listItem(child, opts, true, idx + start))
        .join("")
        .trimEnd();

    return opts.profile.templates.orderedList
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
    const children = node.children
        .map((child) => listItem(child, opts, false))
        .join("")
        .trimEnd();

    return opts.profile.templates.unorderedList.replaceAll(
        "$content",
        children,
    );
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

    const content = node.children
        .map((child) => toCustom(child, childOpts))
        .join("\n")
        .trimEnd();

    let template: string;
    if (ordered) {
        const num = index === undefined ? 1 : index;
        template = opts.profile.templates.listItemOrdered.replaceAll(
            "$index",
            num + "",
        );
    } else {
        template = opts.profile.templates.listItemUnordered;
    }

    const indent = " ".repeat(opts.indentation ?? 0);

    return template.replaceAll("$value", content).replaceAll("$indent", indent);
}
