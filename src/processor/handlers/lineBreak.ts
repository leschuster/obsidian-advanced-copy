import { Break } from "mdast";
import { CustomOptions } from "../toCustom";
import { getTemplateWithGlobalAndFrontmatterVariables } from "../utils/handlerUtils";

/**
 * Convert a break node to string
 * @param node
 * @param opts
 * @returns
 */
export function lineBreak(node: Break, opts: CustomOptions): string {
    return getTemplateWithGlobalAndFrontmatterVariables(
        opts.profile.templates.lineBreak,
        opts,
    );
}
