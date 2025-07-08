import {
    convertChildren,
    getTemplateWithGlobalAndFrontmatterVariables,
} from "../utils/handlerUtils";
import { CustomOptions } from "../toCustom";
import { Delete } from "mdast";

/**
 * Convert a strikethrough node to string
 * @param node
 * @param opts
 * @returns
 */
export function strikethrough(node: Delete, opts: CustomOptions): string {
    const childOpts = opts.topLevel ? { ...opts, topLevel: false } : opts;

    const template = getTemplateWithGlobalAndFrontmatterVariables(
        opts.profile.templates.strikethrough,
        opts,
    );

    const content = convertChildren(node.children, childOpts).join("");

    return template.replaceAll("$value", content);
}
