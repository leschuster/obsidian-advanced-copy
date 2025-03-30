import { Link } from "mdast";
import { CustomOptions } from "../toCustom";
import { convertChildren, getTemplate } from "../utils/handlerUtils";

/**
 * Convert a link node to string
 * @param node
 * @param opts
 * @returns
 */
export function link(node: Link, opts: CustomOptions): string {
    const childOpts = opts.topLevel ? { ...opts, topLevel: false } : opts;

    const template = getTemplate(opts.profile.templates.link, opts);

    const alt = convertChildren(node.children, childOpts).join("");

    return template
        .replaceAll("$src", node.url)
        .replaceAll("$alt", alt)
        .replaceAll("$title", node.title ?? "");
}
