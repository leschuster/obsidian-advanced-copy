import toCustom, { CustomOptions } from "../toCustom";
import { Delete } from "mdast";

/**
 * Convert a strikethrough node to string
 * @param node
 * @param opts
 * @returns
 */
export function strikethrough(node: Delete, opts: CustomOptions): string {
    const content = node.children
        .map((child) => toCustom(child, opts))
        .join("");

    return opts.profile.templates.strikethrough.replaceAll("$value", content);
}
