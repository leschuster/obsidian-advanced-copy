import { Paragraph } from "mdast";
import { CustomOptions } from "../toCustom";
import {
    convertChildren,
    getTemplateWithGlobalAndFrontmatterVariables,
} from "../utils/handlerUtils";

/**
 * Convert a paragraph to string
 * @param node
 * @param opts
 * @returns
 */
export function paragraph(node: Paragraph, opts: CustomOptions): string {
    const template = opts.topLevel
        ? getTemplateWithGlobalAndFrontmatterVariables(
              opts.profile.templates.paragraph,
              opts,
          )
        : getTemplateWithGlobalAndFrontmatterVariables(
              opts.profile.templates.paragraphNested,
              opts,
          );

    const childOpts = opts.topLevel ? { ...opts, topLevel: false } : opts;

    const content = convertChildren(node.children, childOpts).join("");

    return template.replaceAll("$value", content);
}
