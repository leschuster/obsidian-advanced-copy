import { InlineCode } from "mdast";
import { CustomOptions } from "../toCustom";

/**
 * Convert a code inline node to string
 * @param node
 * @param opts
 * @returns
 */
export function codeInline(node: InlineCode, opts: CustomOptions): string {
    return opts.profile.templates.codeInline.replaceAll("$value", node.value);
}
