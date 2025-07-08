import { Emphasis } from "mdast";
import { CustomOptions } from "../toCustom";
import {
    convertChildren,
    getTemplateWithGlobalAndFrontmatterVariables,
} from "../utils/handlerUtils";

/**
 * Convert an italic node to string
 * @param node
 * @param opts
 * @returns
 */
export function italic(node: Emphasis, opts: CustomOptions): string {
    const childOpts = opts.topLevel ? { ...opts, topLevel: false } : opts;

    const template = getTemplateWithGlobalAndFrontmatterVariables(
        opts.profile.templates.italic,
        opts,
    );

    const content = convertChildren(node.children, childOpts).join("");

    return template.replaceAll("$value", content);
}
