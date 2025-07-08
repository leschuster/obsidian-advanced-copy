import { InlineMath } from "mdast-util-math";
import { CustomOptions } from "../toCustom";
import { getTemplateWithGlobalAndFrontmatterVariables } from "../utils/handlerUtils";

/**
 * Convert a inline math node to string
 * @param node
 * @param opts
 * @returns
 */
export function mathInline(node: InlineMath, opts: CustomOptions): string {
    const template = getTemplateWithGlobalAndFrontmatterVariables(
        opts.profile.templates.mathInline,
        opts,
    );

    return template.replaceAll("$value", node.value);
}
