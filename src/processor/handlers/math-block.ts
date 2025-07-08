import { Math as MathNode } from "mdast-util-math";
import { CustomOptions } from "../toCustom";
import { getTemplateWithGlobalAndFrontmatterVariables } from "../utils/handlerUtils";

/**
 * Convert a math block node to string
 * @param node
 * @param opts
 * @returns
 */
export function mathBlock(node: MathNode, opts: CustomOptions): string {
    const template = getTemplateWithGlobalAndFrontmatterVariables(
        opts.profile.templates.mathBlock,
        opts,
    );

    return template
        .replaceAll("$value", node.value)
        .replaceAll("$meta", node.meta ?? "");
}
