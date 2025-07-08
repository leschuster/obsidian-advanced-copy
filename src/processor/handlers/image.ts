import { Image } from "mdast";
import { CustomOptions } from "../toCustom";
import { getTemplateWithGlobalAndFrontmatterVariables } from "../utils/handlerUtils";

/**
 * Convert an image node to string
 * @param node
 * @param opts
 * @returns
 */
export function image(node: Image, opts: CustomOptions): string {
    const template = getTemplateWithGlobalAndFrontmatterVariables(
        opts.profile.templates.image,
        opts,
    );

    return template
        .replaceAll("$src", node.url)
        .replaceAll("$title", node.title ?? "")
        .replaceAll("$alt", node.alt ?? "");
}
