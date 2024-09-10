import { ListItem } from "mdast";
import { Profile } from "src/settings/settings";
import toCustom from "../toCustom";

/**
 * Convert a list item to string
 * Available variables:
 * - $value
 * @param node
 * @param profile
 * @returns
 */
export function listItem(node: ListItem, profile: Profile): string {
	const content = node.children
		.map((child) => toCustom(child, { profile }))
		.join("");

	return profile.templates.listItem.replaceAll("$value", content);
}
