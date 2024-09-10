import { InlineCode } from "mdast";
import { Profile } from "src/settings/settings";

/**
 * Convert a code inline node to string
 * Available variables:
 * - $value
 * @param node
 * @param profile
 * @returns
 */
export function codeInline(node: InlineCode, profile: Profile): string {
	return profile.templates.codeInline.replaceAll("$value", node.value);
}
