import { Blockquote } from "mdast";
import toCustom, { CustomOptions } from "src/processor/toCustom";
import { convertChildren, getTemplate } from "../handlerUtils";

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

    const lineTemplate = getTemplate(
        opts.profile.templates.blockquoteLine,
        opts,
    );
    const wrapperTemplate = getTemplate(
        opts.profile.templates.blockquoteWrapper,
        opts,
    );

    const content = convertChildren(node.children, childOpts)
        .map((line) =>
            line
                .split("\n")
                .filter((l) => l.trim() !== "")
                .map((l) => lineTemplate.replaceAll("$value", l))
                .join(""),
        )
        .join("");

    return wrapperTemplate.replaceAll("$content", content);
}
