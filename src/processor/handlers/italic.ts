import { Emphasis } from "mdast";
import toCustom, { CustomOptions } from "../toCustom";

/**
 * Convert an italic node to string
 * @param node
 * @param opts
 * @returns
 */
export function italic(node: Emphasis, opts: CustomOptions): string {
    const content = node.children
        .map((child) => toCustom(child, opts))
        .join("");

    return opts.profile.templates.italic.replaceAll("$value", content);
}
