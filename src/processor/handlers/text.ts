import { Text } from "mdast";
import { CustomOptions } from "../toCustom";
import { getTemplateWithGlobalAndFrontmatterVariables } from "../utils/handlerUtils";

/**
 * Convert a text node to string
 * @param node
 * @param opts
 * @returns
 */
export function text(node: Text, opts: CustomOptions): string {
    const template = getTemplateWithGlobalAndFrontmatterVariables(
        opts.profile.templates.text,
        opts,
    );

    return template.replaceAll("$value", node.value);
}
