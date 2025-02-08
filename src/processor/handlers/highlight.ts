import { convertChildren, getTemplate } from "../handlerUtils";
import { Highlight } from "../remark-plugins/highlight";
import { CustomOptions } from "../toCustom";

/**
 * Convert a highlight node to string
 * @param node
 * @param opts
 * @returns
 */
export function highlight(node: Highlight, opts: CustomOptions): string {
    const childOpts = opts.topLevel ? { ...opts, topLevel: false } : opts;

    const template = getTemplate(opts.profile.templates.highlight, opts);

    const content = convertChildren(node.children, childOpts).join("");

    return template.replaceAll("$value", content);
}
