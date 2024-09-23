import { Paragraph } from "mdast";
import toCustom, { CustomOptions } from "../toCustom";

/**
 * Convert a paragraph to string
 * @param node
 * @param opts
 * @returns
 */
export function paragraph(node: Paragraph, opts: CustomOptions): string {
    const template = opts.topLevel
        ? opts.profile.templates.paragraph
        : opts.profile.templates.paragraphNested;

    const childOpts = opts.topLevel ? { ...opts, topLevel: false } : opts;

    const content = node.children
        .map((child) => toCustom(child, childOpts))
        .join("");

    return template.replaceAll("$value", content);
}
