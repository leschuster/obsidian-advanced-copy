import { Heading } from "mdast";
import toCustom, { CustomOptions } from "../toCustom";
import { Logger } from "src/utils/Logger";

/**
 * Convert a heading node to string
 * @param node
 * @param opts
 * @returns
 */
export function heading(node: Heading, opts: CustomOptions): string {
    const content = node.children
        .map((child) => toCustom(child, opts))
        .join("");

    const template = opts.profile.templates[`heading${node.depth}`];

    if (!template) {
        Logger.error(`could not find template 'heading${node.depth}'`);
        return "";
    }

    return template
        .replaceAll("$value", content)
        .replaceAll("$level", node.depth + "");
}
