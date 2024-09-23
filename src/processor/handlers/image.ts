import { Image } from "mdast";
import { CustomOptions } from "../toCustom";

/**
 * Convert an image node to string
 * @param node
 * @param opts
 * @returns
 */
export function image(node: Image, opts: CustomOptions): string {
    let content = opts.profile.templates.image
        .replaceAll("$src", node.url)
        .replaceAll("$title", node.title ?? "")
        .replaceAll("$alt", node.alt ?? "");

    return content;
}
