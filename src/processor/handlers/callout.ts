import { Callout } from "../remark-plugins/remark-callout";
import toCustom, { CustomOptions } from "../toCustom";

/**
 * Convert a callout node to string
 * @param node
 * @param opts
 * @returns
 */
export function callout(node: Callout, opts: CustomOptions): string {
    const title = node.title.map((child) => toCustom(child, opts)).join("");

    const childOpts = opts.topLevel ? { ...opts, topLevel: false } : opts;

    const content = node.children
        .map((child) => toCustom(child, childOpts))
        .map((line) =>
            line
                .split("\n")
                .filter((l) => l.trim() !== "")
                .map((l) =>
                    opts.profile.templates.calloutContentLine.replaceAll(
                        "$value",
                        l,
                    ),
                )
                .join(""),
        )
        .join("");

    return opts.profile.templates.callout
        .replaceAll("$type", node.calloutType)
        .replaceAll("$behavior", node.calloutBehavior)
        .replaceAll("$content", content)
        .replaceAll("$title", title)
        .replaceAll("$closeable", node.closeable + "")
        .replaceAll("$default_open", node.default_open + "");
}
