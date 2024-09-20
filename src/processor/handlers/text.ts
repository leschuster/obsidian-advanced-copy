import { Text } from "mdast";
import { Profile } from "src/settings/settings";

/**
 * Convert a text node to string
 * @param node
 * @param profile
 * @returns
 */
export function text(node: Text, profile: Profile): string {
    return profile.templates.text.replaceAll("$value", node.value);
}
