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
    const childOpts = opts.topLevel ? { ...opts, topLevel: false } : opts;

    const content = node.children
        .map((child) => toCustom(child, childOpts))
        .map((line) =>
            line
                .split("\n")
                .filter((l) => l.trim() !== "")
                .map((l) =>
                    opts.profile.templates.blockquoteLine.replaceAll(
                        "$value",
                        l,
                    ),
                )
                .join(""),
        )
        .join("");

    return opts.profile.templates.blockquoteWrapper.replaceAll(
        "$content",
        content,
    );
}
