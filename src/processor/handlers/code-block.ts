import { Code } from "mdast";
import { CustomOptions } from "../toCustom";

/**
 * Convert a code block node to string
 * @param node
 * @param opts
 * @returns
 */
export function codeBlock(node: Code, opts: CustomOptions): string {
    const content = opts.profile.templates.codeBlock
        .replaceAll("$value", node.value)
        .replaceAll("$lang", node.lang ?? "")
        .replaceAll("$meta", node.meta ?? "");

    return content;
}
