import { Profile } from "src/settings/settings";
import { Wikilink } from "../remark-plugins/wikilink";

/**
 * Convert a wikilink to string
 * @param node
 * @param profile
 * @returns
 */
export function wikilink(node: Wikilink, profile: Profile): string {
    if (node.embedded) {
        return embeddedWikilink(node, profile);
    } else {
        return normalWikilink(node, profile);
    }
}

/**
 * Convert a normal wikilink to string
 * @param node
 * @param profile
 * @returns
 */
function normalWikilink(node: Wikilink, profile: Profile): string {
    return profile.templates.wikilink
        .replaceAll("$text", node.value)
        .replaceAll("$link", node.link);
}

/**
 * Convert an embedded wikilink to string
 * @param node
 * @param profile
 * @returns
 */
function embeddedWikilink(node: Wikilink, profile: Profile): string {
    return profile.templates.embeddedWikilink
        .replaceAll("$text", node.value)
        .replaceAll("$link", node.link);
}
