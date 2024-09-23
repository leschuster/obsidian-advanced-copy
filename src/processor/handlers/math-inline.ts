import { InlineMath } from "mdast-util-math";
import { CustomOptions } from "../toCustom";

/**
 * Convert a inline math node to string
 * @param node
 * @param opts
 * @returns
 */
export function mathInline(node: InlineMath, opts: CustomOptions): string {
    return opts.profile.templates.mathInline.replaceAll("$value", node.value);
}
