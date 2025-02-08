import { Break } from "mdast";
import { CustomOptions } from "../toCustom";
import { getTemplate } from "../handlerUtils";

/**
 * Convert a break node to string
 * @param node
 * @param opts
 * @returns
 */
export function lineBreak(node: Break, opts: CustomOptions): string {
    return getTemplate(opts.profile.templates.lineBreak, opts);
}
