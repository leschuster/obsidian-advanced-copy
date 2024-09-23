import { Math as MathNode } from "mdast-util-math";
import { CustomOptions } from "../toCustom";

/**
 * Convert a math block node to string
 * @param node
 * @param opts
 * @returns
 */
export function mathBlock(node: MathNode, opts: CustomOptions): string {
    let content = opts.profile.templates.mathBlock
        .replaceAll("$value", node.value)
        .replaceAll("$meta", node.meta ?? "");

    return content;
}
