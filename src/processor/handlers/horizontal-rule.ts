import { ThematicBreak } from "mdast";
import { CustomOptions } from "../toCustom";

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
    return opts.profile.templates.horizontalRule;
}
