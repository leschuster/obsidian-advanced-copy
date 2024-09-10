import { Profile } from "src/settings/settings";
import { Math as MathNode } from "mdast-util-math";

/**
 * Convert a math block node to string
 * Available variables:
 * - $value
 * - $meta
 * @param node
 * @param profile
 * @returns
 */
export function mathBlock(node: MathNode, profile: Profile): string {
	let content = profile.templates.mathBlock.replaceAll("$value", node.value);

	if (node.meta) {
		content = content.replaceAll("$meta", node.meta);
	}

	return content;
}
