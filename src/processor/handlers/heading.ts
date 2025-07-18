import { Heading } from "mdast";
import { CustomOptions } from "../toCustom";
import {
    convertChildren,
    getTemplateWithGlobalAndFrontmatterVariables,
} from "../utils/handlerUtils";

/**
 * Convert a heading node to string
 * @param node
 * @param opts
 * @returns
 */
export function heading(node: Heading, opts: CustomOptions): string {
    const childOpts = opts.topLevel ? { ...opts, topLevel: false } : opts;

    const content = convertChildren(node.children, childOpts).join("");

    const template = getTemplateWithGlobalAndFrontmatterVariables(
        opts.profile.templates[`heading${node.depth}`],
        opts,
    );

    return template
        .replaceAll("$value", content)
        .replaceAll("$level", node.depth + "");
}
