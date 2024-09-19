import { Paragraph } from "mdast";
import { Profile } from "src/settings/settings";
import toCustom from "../toCustom";

/**
 * Convert a paragraph to string
 * Available variables:
 * - $value
 * @param node
 * @param profile
 * @returns
 */
export function paragraph(node: Paragraph, profile: Profile): string {
    const content = node.children
        .map((child) => toCustom(child, { profile }))
        .join("");

    return profile.templates.paragraph.replaceAll("$value", content);
}
