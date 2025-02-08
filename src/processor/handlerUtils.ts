import { ProfileTemplate } from "src/settings/settings";
import toCustom, { CustomOptions } from "./toCustom";
import { Nodes } from "mdast";

/**
 * Get the template for a node depending on its options
 * @param profileTemplate
 * @param opts
 * @returns
 */
export function getTemplate(
    profileTemplate: ProfileTemplate,
    opts: CustomOptions,
): string {
    if (typeof profileTemplate === "string") {
        return profileTemplate;
    }

    switch (true) {
        case profileTemplate.templateFirstChild && opts.isFirstChild:
            return profileTemplate.templateFirstChild;
        case profileTemplate.templateLastChild && opts.isLastChild:
            return profileTemplate.templateLastChild;
        case profileTemplate.templateFirstOfType && opts.isFirstOfType:
            return profileTemplate.templateFirstOfType;
        case profileTemplate.templateLastOfType && opts.isLastOfType:
            return profileTemplate.templateLastOfType;
        default:
            return profileTemplate.template;
    }
}

/**
 * Convert all children list to string
 * @param children
 * @param opts
 * @returns converted children
 */
export function convertChildren(
    children: Nodes[],
    opts: CustomOptions,
): string[] {
    if (children.length === 0) {
        return [];
    }

    // Count the total number of children of each type
    const totalTypeCount = children.reduce(
        (acc, curr) => {
            acc[curr.type] = (acc[curr.type] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>,
    );

    // Keep track of the number of children of each type
    // as we iterate through them
    const typeCount: Record<string, number> = {};

    const output: string[] = [];

    // Iterate through all children
    for (const [idx, child] of children.entries()) {
        typeCount[child.type] = (typeCount[child.type] || 0) + 1;

        const isFirstChild = idx === 0;
        const isLastChild = idx === children.length - 1;
        const isFirstOfType = typeCount[child.type] === 1;
        const isLastOfType =
            typeCount[child.type] === totalTypeCount[child.type];

        const childOpts = {
            ...opts,
            isFirstOfType,
            isLastOfType,
            isFirstChild,
            isLastChild,
        };

        output.push(toCustom(child, childOpts));
    }

    return output;
}
