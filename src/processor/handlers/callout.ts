import { Profile } from "src/settings/settings";
import { Callout } from "../remark-plugins/remark-callout";
import toCustom from "../toCustom";

/**
 * Convert a callout node to string
 * Available variables:
 * - $type
 * - $content
 * - $title
 * - $closeable
 * - $default_open
 * @param node
 * @param profile
 * @returns
 */
export function callout(node: Callout, profile: Profile): string {
    const title = node.title
        .map((child) => toCustom(child, { profile }))
        .join("");
    const content = node.children
        .map((child) => {
            const value = toCustom(child, { profile });
            return profile.templates.calloutContentLine.replaceAll(
                "$value",
                value,
            );
        })
        .join("");

    return profile.templates.callout
        .replaceAll("$type", node.calloutType)
        .replaceAll("$behavior", node.calloutBehavior)
        .replaceAll("$content", content)
        .replaceAll("$title", title)
        .replaceAll("$closeable", node.closeable + "")
        .replaceAll("$default_open", node.default_open + "");
}
