import { Root } from "mdast";
import { CustomOptions } from "../toCustom";
import { convertChildren } from "../handlerUtils";

/**
 * Convert a root node to string
 * @param node
 * @param opts
 * @returns
 */
export function root(node: Root, opts: CustomOptions): string {
    const childOpts = { ...opts, topLevel: true };

    return convertChildren(node.children, childOpts).join("").trim();
}
