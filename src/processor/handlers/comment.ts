import { CustomOptions } from "../toCustom";
import {
    convertChildren,
    getTemplateWithGlobalAndFrontmatterVariables,
} from "../utils/handlerUtils";
import { Comment } from "../remark-plugins/comments";

/**
 * Convert a comment node to string
 * @param node
 * @param opts
 * @returns
 */
export function comment(node: Comment, opts: CustomOptions): string {
    const childOpts = opts.topLevel ? { ...opts, topLevel: false } : opts;

    const template = getTemplateWithGlobalAndFrontmatterVariables(
        opts.profile.templates.comment,
        opts,
    );

    const content = convertChildren(node.children, childOpts).join("");

    return template.replaceAll("$value", content);
}
