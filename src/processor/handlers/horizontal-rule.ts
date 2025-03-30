import { ThematicBreak } from "mdast";
import { CustomOptions } from "../toCustom";
import { getTemplate } from "../utils/handlerUtils";

/**
 * Convert a horizontal rule node to string
 * @param node
 * @param opts
 * @returns
 */
export function horizontalRule(
    node: ThematicBreak,
    opts: CustomOptions,
): string {
    return getTemplate(opts.profile.templates.horizontalRule, opts);
}
