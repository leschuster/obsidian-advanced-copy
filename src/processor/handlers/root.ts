import { Root } from "mdast";
import toCustom, { CustomOptions } from "../toCustom";

/**
 * Convert a root node to string
 * @param node
 * @param opts
 * @returns
 */
export function root(node: Root, opts: CustomOptions): string {
    return node.children.map((child) => toCustom(child, opts)).join("");
}
