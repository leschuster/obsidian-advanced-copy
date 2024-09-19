import { Break } from "mdast";
import { Profile } from "src/settings/settings";

/**
 * Convert a break node to string
 * @param node
 * @param profile
 * @returns
 */
export function lineBreak(node: Break, profile: Profile): string {
    return profile.templates.lineBreak;
}
