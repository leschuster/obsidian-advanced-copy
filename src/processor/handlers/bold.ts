import { Strong } from "mdast";
import toCustom, { CustomOptions } from "../toCustom";

/**
 * Convert a bold node to string
 * @param node
 * @param opts
 * @returns
 */
export function bold(node: Strong, opts: CustomOptions): string {
    const content = node.children
        .map((child) => toCustom(child, opts))
        .join("");

    return opts.profile.templates.bold.replaceAll("$value", content);
}
