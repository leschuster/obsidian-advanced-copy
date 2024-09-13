import { Link } from "mdast";
import { Profile } from "src/settings/settings";
import toCustom from "../toCustom";

/**
 * Convert a link node to string
 * Available variables:
 * - $url
 * - $title
 * - $alt
 * @param node
 * @param profile
 * @returns
 */
export function link(node: Link, profile: Profile): string {
	const alt = node.children
		.map((child) => toCustom(child, { profile }))
		.join("");

	let content = profile.templates.link
		.replaceAll("$url", node.url)
		.replaceAll("$alt", alt)
		.replaceAll("$title", node.title ?? "");

	return content;
}
