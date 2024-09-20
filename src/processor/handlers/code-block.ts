import { Code } from "mdast";
import { Profile } from "src/settings/settings";

/**
 * Convert a code block node to string
 * @param node
 * @param profile
 * @returns
 */
export function codeBlock(node: Code, profile: Profile): string {
    const content = profile.templates.codeBlock
        .replaceAll("$value", node.value)
        .replaceAll("$lang", node.lang ?? "")
        .replaceAll("$meta", node.meta ?? "");

    return content;
}
