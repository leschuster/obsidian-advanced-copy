import { Emphasis } from "mdast";
import { Profile } from "src/settings/settings";
import toCustom from "../toCustom";

/**
 * Convert an italic node to string
 * Available variables:
 * - $value
 * @param node
 * @param profile
 * @returns
 */
export function italic(node: Emphasis, profile: Profile): string {
    const content = node.children
        .map((child) => toCustom(child, { profile }))
        .join("");

    return profile.templates.italic.replaceAll("$value", content);
}
