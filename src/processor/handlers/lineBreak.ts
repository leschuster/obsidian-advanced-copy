import { Break } from "mdast";
import { CustomOptions } from "../toCustom";

/**
 * Convert a break node to string
 * @param node
 * @param opts
 * @returns
 */
export function lineBreak(node: Break, opts: CustomOptions): string {
    return opts.profile.templates.lineBreak;
}
