import { Image } from "mdast";
import { Profile } from "src/settings/settings";

/**
 * Convert an image node to string
 * @param node
 * @param profile
 * @returns
 */
export function image(node: Image, profile: Profile): string {
    let content = profile.templates.image
        .replaceAll("$src", node.url)
        .replaceAll("$title", node.title ?? "")
        .replaceAll("$alt", node.alt ?? "");

    return content;
}
