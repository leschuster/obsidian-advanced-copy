import { convertChildren, getTemplate } from "../utils/handlerUtils";
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

    const lineTemplate = getTemplate(
        opts.profile.templates.calloutContentLine,
        opts,
    );
    const calloutTemplate = getTemplate(opts.profile.templates.callout, opts);

    const content = convertChildren(node.children, childOpts)
        .map((line) =>
            line
                .split("\n")
                .filter((l) => l.trim() !== "")
                .map((l) => lineTemplate.replaceAll("$value", l))
                .join(""),
        )
        .join("");

    return calloutTemplate
        .replaceAll("$type", node.calloutType)
        .replaceAll("$behavior", node.calloutBehavior)
        .replaceAll("$content", content)
        .replaceAll("$title", title)
        .replaceAll("$closeable", node.closeable + "")
        .replaceAll("$default_open", node.default_open + "");
}
