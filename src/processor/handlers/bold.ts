import { Strong } from "mdast";
import { CustomOptions } from "../toCustom";
import { convertChildren, getTemplate } from "../handlerUtils";

/**
 * Convert a bold node to string
 * @param node
 * @param opts
 * @returns
 */
export function bold(node: Strong, opts: CustomOptions): string {
    const childOpts = opts.topLevel ? { ...opts, topLevel: false } : opts;

    const template = getTemplate(opts.profile.templates.bold, opts);

    const content = convertChildren(node.children, childOpts).join("");

    return template.replaceAll("$value", content);
}
