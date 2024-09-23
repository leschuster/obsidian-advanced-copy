import { Wikilink } from "../remark-plugins/wikilink";
import { CustomOptions } from "../toCustom";

/**
 * Convert a wikilink to string
 * @param node
 * @param opts
 * @returns
 */
export function wikilink(node: Wikilink, opts: CustomOptions): string {
    if (node.embedded) {
        return embeddedWikilink(node, opts);
    } else {
        return normalWikilink(node, opts);
    }
}

/**
 * Convert a normal wikilink to string
 * @param node
 * @param otps
 * @returns
 */
function normalWikilink(node: Wikilink, opts: CustomOptions): string {
    return opts.profile.templates.wikilink
        .replaceAll("$text", node.value || node.link)
        .replaceAll("$link", node.link);
}

/**
 * Convert an embedded wikilink to string
 * @param node
 * @param opts
 * @returns
 */
function embeddedWikilink(node: Wikilink, opts: CustomOptions): string {
    return opts.profile.templates.embeddedWikilink
        .replaceAll("$text", node.value || node.link)
        .replaceAll("$link", node.link);
}
