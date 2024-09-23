import { Paragraph } from "mdast";
import toCustom, { CustomOptions } from "../toCustom";

/**
 * Convert a paragraph to string
 * @param node
 * @param opts
 * @returns
 */
export function paragraph(node: Paragraph, opts: CustomOptions): string {
    const content = node.children
        .map((child) => toCustom(child, opts))
        .join("");

    return opts.profile.templates.paragraph.replaceAll("$value", content);
}
