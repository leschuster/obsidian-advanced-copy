import { Code } from "mdast";
import { Profile } from "src/settings/settings";

/**
 * Convert a code block node to string
 * Available variables:
 * - $value
 * - $lang
 * - $meta
 * @param node
 * @param profile
 * @returns
 */
export function codeBlock(node: Code, profile: Profile): string {
	let content = profile.templates.codeBlock.replaceAll("$value", node.value);

	if (node.lang) {
		content = content.replaceAll("$lang", node.lang);
	}
	if (node.meta) {
		content = content.replaceAll("$meta", node.meta);
	}

	return content;
}
