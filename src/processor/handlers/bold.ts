import { Strong } from "mdast";
import { CustomOptions } from "../toCustom";
import {
    convertChildren,
    getTemplateWithGlobalAndFrontmatterVariables,
} from "../utils/handlerUtils";

/**
 * Convert a bold node to string
 * @param node
 * @param opts
 * @returns
 */
export function bold(node: Strong, opts: CustomOptions): string {
    const childOpts = opts.topLevel ? { ...opts, topLevel: false } : opts;

    const template = getTemplateWithGlobalAndFrontmatterVariables(
        opts.profile.templates.bold,
        opts,
    );

    const content = convertChildren(node.children, childOpts).join("");

    return template.replaceAll("$value", content);
}
