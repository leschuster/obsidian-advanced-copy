import { Heading } from "mdast";
import { CustomOptions } from "../toCustom";
import { Logger } from "src/utils/Logger";
import { convertChildren, getTemplate } from "../handlerUtils";

/**
 * Convert a heading node to string
 * @param node
 * @param opts
 * @returns
 */
export function heading(node: Heading, opts: CustomOptions): string {
    const childOpts = opts.topLevel ? { ...opts, topLevel: false } : opts;

    const content = convertChildren(node.children, childOpts).join("");

    const template = getTemplate(
        opts.profile.templates[`heading${node.depth}`],
        opts,
    );

    if (!template) {
        Logger.error(`could not find template 'heading${node.depth}'`);
        return "";
    }

    return template
        .replaceAll("$value", content)
        .replaceAll("$level", node.depth + "");
}
