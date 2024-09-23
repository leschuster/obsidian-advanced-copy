import { Link } from "mdast";
import toCustom, { CustomOptions } from "../toCustom";

/**
 * Convert a link node to string
 * @param node
 * @param opts
 * @returns
 */
export function link(node: Link, opts: CustomOptions): string {
    const childOpts = opts.topLevel ? { ...opts, topLevel: false } : opts;

    const alt = node.children
        .map((child) => toCustom(child, childOpts))
        .join("");

    let content = opts.profile.templates.link
        .replaceAll("$src", node.url)
        .replaceAll("$alt", alt)
        .replaceAll("$title", node.title ?? "");

    return content;
}
