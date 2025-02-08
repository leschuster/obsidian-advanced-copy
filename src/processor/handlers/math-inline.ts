import { InlineMath } from "mdast-util-math";
import { CustomOptions } from "../toCustom";
import { getTemplate } from "../handlerUtils";

/**
 * Convert a inline math node to string
 * @param node
 * @param opts
 * @returns
 */
export function mathInline(node: InlineMath, opts: CustomOptions): string {
    const template = getTemplate(opts.profile.templates.mathInline, opts);

    return template.replaceAll("$value", node.value);
}
