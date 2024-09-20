import { Blockquote } from "mdast";
import { Profile } from "src/settings/settings";
import toCustom from "src/processor/toCustom";

/**
 * Convert a blockquote node to string
 *
 * Each line is converted using the `blockquoteLine` template.
 * All converted lines are inserted into the `bockquoteWrapper` template.
 * @param node
 * @param profile
 * @returns
 */
export function blockquote(node: Blockquote, profile: Profile): string {
    const content = node.children
        .map((child) => toCustom(child, { profile }))
        .map((line) =>
            profile.templates.blockquoteLine.replaceAll("$value", line),
        )
        .join("");

    return profile.templates.blockquoteWrapper.replaceAll("$content", content);
}
