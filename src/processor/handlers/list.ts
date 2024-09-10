import { List } from "mdast";
import { Profile } from "src/settings/settings";
import toCustom from "../toCustom";

/**
 * Convert a list node to string
 * @param node
 * @param profile
 * @returns
 */
export function list(node: List, profile: Profile): string {
	if (node.ordered) {
		return orderedList(node, profile);
	} else {
		return unorderedList(node, profile);
	}
}

/**
 * Convert an ordered list node to string
 * Available variables:
 * - $value
 * - $start
 * @param node
 * @param profile
 * @returns
 */
function orderedList(node: List, profile: Profile): string {
	const children = node.children
		.map((child) => toCustom(child, { profile }))
		.join("");

	const start = node.start ?? 1;

	return profile.templates.orderedList
		.replaceAll("$value", children)
		.replaceAll("$start", start + "");
}

/**
 * Convert an unordered list node to string
 * Available variables:
 * - $value
 * @param node
 * @param profile
 * @returns
 */
function unorderedList(node: List, profile: Profile): string {
	const children = node.children
		.map((child) => toCustom(child, { profile }))
		.join("");

	return profile.templates.unorderedList.replaceAll("$value", children);
}
