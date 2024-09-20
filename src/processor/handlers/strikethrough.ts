import { Profile } from "src/settings/settings";
import toCustom from "../toCustom";
import { Delete } from "mdast";

/**
 * Convert a strikethrough node to string
 * @param node
 * @param profile
 * @returns
 */
export function strikethrough(node: Delete, profile: Profile): string {
    const content = node.children
        .map((child) => toCustom(child, { profile }))
        .join("");

    return profile.templates.strikethrough.replaceAll("$value", content);
}
