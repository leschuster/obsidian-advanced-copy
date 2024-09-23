import { Emphasis } from "mdast";
import toCustom, { CustomOptions } from "../toCustom";

/**
 * Convert an italic node to string
 * @param node
 * @param opts
 * @returns
 */
export function italic(node: Emphasis, opts: CustomOptions): string {
    const childOpts = opts.topLevel ? { ...opts, topLevel: false } : opts;

    const content = node.children
        .map((child) => toCustom(child, childOpts))
        .join("");

    return opts.profile.templates.italic.replaceAll("$value", content);
}
