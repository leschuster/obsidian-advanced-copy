import { ThematicBreak } from "mdast";
import { Profile } from "src/settings/settings";

/**
 * Convert a horizontal rule node to string
 * @param node
 * @param profile
 * @returns
 */
export function horizontalRule(node: ThematicBreak, profile: Profile): string {
	return profile.templates.horizontalRule;
}
