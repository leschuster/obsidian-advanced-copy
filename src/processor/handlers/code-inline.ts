import { InlineCode } from "mdast";
import { CustomOptions } from "../toCustom";
import { getTemplate } from "../utils/handlerUtils";

/**
 * Convert a code inline node to string
 * @param node
 * @param opts
 * @returns
 */
export function codeInline(node: InlineCode, opts: CustomOptions): string {
    const template = getTemplate(opts.profile.templates.codeInline, opts);

    return template.replaceAll("$value", node.value);
}
