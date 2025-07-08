import { Code } from "mdast";
import { CustomOptions } from "../toCustom";
import { getTemplateWithGlobalAndFrontmatterVariables } from "../utils/handlerUtils";

/**
 * Convert a code block node to string
 * @param node
 * @param opts
 * @returns
 */
export function codeBlock(node: Code, opts: CustomOptions): string {
    const template = getTemplateWithGlobalAndFrontmatterVariables(
        opts.profile.templates.codeBlock,
        opts,
    );

    const content = template
        .replaceAll("$value", node.value)
        .replaceAll("$lang", node.lang ?? "")
        .replaceAll("$meta", node.meta ?? "");

    return content;
}
