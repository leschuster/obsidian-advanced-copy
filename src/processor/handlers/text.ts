import { Text } from "mdast";
import { CustomOptions } from "../toCustom";

/**
 * Convert a text node to string
 * @param node
 * @param opts
 * @returns
 */
export function text(node: Text, opts: CustomOptions): string {
    return opts.profile.templates.text.replaceAll("$value", node.value);
}
