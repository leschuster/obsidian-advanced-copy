import { InlineMath } from "mdast-util-math";
import { Profile } from "src/settings/settings";

/**
 * Convert a inline math node to string
 * Available variables:
 * - $value
 * @param node
 * @param profile
 * @returns
 */
export function mathInline(node: InlineMath, profile: Profile): string {
	return profile.templates.mathInline.replaceAll("$value", node.value);
}
