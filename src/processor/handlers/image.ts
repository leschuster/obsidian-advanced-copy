import { Image } from "mdast";
import { Profile } from "src/settings/settings";

/**
 * Convert an image node to string
 * Available variables:
 * - $url
 * - $title
 * - $alt
 * @param node
 * @param profile
 * @returns
 */
export function image(node: Image, profile: Profile): string {
	let content = profile.templates.image.replaceAll("$url", node.url);

	if (node.title) {
		content = content.replaceAll("$title", node.title);
	}
	if (node.alt) {
		content = content.replaceAll("$alt", node.alt);
	}

	return content;
}
