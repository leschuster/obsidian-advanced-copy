import { Blockquote } from "mdast";
import toCustom, { CustomOptions } from "src/processor/toCustom";

/**
 * Convert a blockquote node to string
 *
 * Each line is converted using the `blockquoteLine` template.
 * All converted lines are inserted into the `bockquoteWrapper` template.
 * @param node
 * @param opts
 * @returns
 */
export function blockquote(node: Blockquote, opts: CustomOptions): string {
    const content = node.children
        .map((child) => toCustom(child, opts))
        .map((line) =>
            opts.profile.templates.blockquoteLine.replaceAll("$value", line),
        )
        .join("");

    return opts.profile.templates.blockquoteWrapper.replaceAll(
        "$content",
        content,
    );
}
