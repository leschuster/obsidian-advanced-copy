import { Profile } from "src/settings/settings";
import { Callout } from "../remark-plugins/remark-callout";
import toCustom from "../toCustom";

/**
 * Convert a callout node to string
 * Available variables:
 * - $type
 * - $value
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
    const value = node.children
        .map((child) => toCustom(child, { profile }))
        .join("");

    return profile.templates.callout
        .replaceAll("$type", node.calloutType)
        .replaceAll("$value", value)
        .replaceAll("$title", title)
        .replaceAll("$closeable", node.closeable + "")
        .replaceAll("$default_open", node.default_open + "");
}
