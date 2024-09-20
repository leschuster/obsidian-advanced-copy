import { Heading } from "mdast";
import { Profile } from "src/settings/settings";
import toCustom from "../toCustom";
import { Logger } from "src/utils/Logger";

/**
 * Convert a heading node to string
 * @param node
 * @param profile
 * @returns
 */
export function heading(node: Heading, profile: Profile): string {
    const content = node.children
        .map((child) => toCustom(child, { profile }))
        .join("");

    const template = profile.templates[`heading${node.depth}`];

    if (!template) {
        Logger.error(`could not find template 'heading${node.depth}'`);
        return "";
    }

    return template
        .replaceAll("$value", content)
        .replaceAll("$level", node.depth + "");
}
