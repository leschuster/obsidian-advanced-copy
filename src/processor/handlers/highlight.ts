import { Highlight } from "../remark-plugins/highlight";
import toCustom, { CustomOptions } from "../toCustom";

/**
 * Convert a highlight node to string
 * @param node
 * @param opts
 * @returns
 */
export function highlight(node: Highlight, opts: CustomOptions): string {
    const childOpts = opts.topLevel ? { ...opts, topLevel: false } : opts;

    const content = node.children
        .map((child) => toCustom(child, childOpts))
        .join("");

    return opts.profile.templates.highlight.replaceAll("$value", content);
}
