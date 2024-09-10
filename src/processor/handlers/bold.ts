import { Strong } from "mdast";
import { Profile } from "src/settings/settings";
import toCustom from "../toCustom";

/**
 * Convert a bold node to string
 * @param node
 * @param profile
 * @returns
 */
export function bold(node: Strong, profile: Profile): string {
	const content = node.children
		.map((child) => toCustom(child, { profile }))
		.join("");

	return profile.templates.bold.replaceAll("$value", content);
}
