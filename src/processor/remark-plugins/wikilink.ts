import { Data, Literal, Root } from "mdast";
import { Transformer } from "unified";
import { findAndReplace } from "mdast-util-find-and-replace";

/**
 * Markdown Wikilink node parsed from Obsidian syntax.
 */
export interface Wikilink extends Literal {
	/**
	 * Node type of Wikilink.
	 */
	type: "wikilink";
	/**
	 * Display value of Wikilink.
	 */
	value: string;
	/**
	 * Link value of Wikilink.
	 */
	link: string;
	/**
	 * Whether the Wikilink is an embedded link.
	 */
	embedded: boolean;
	/**
	 * Data associated with the Wikilink.
	 */
	data?: WikilinkData | undefined;
}

export interface WikilinkData extends Data {}

declare module "mdast" {
	interface RootContentMap {
		wikilink: Wikilink;
	}

	interface PhrasingContentMap {
		wikilink: Wikilink;
	}
}

const REGEX =
	/(?<embed>\!)?(?:\[{2})(?<link>[^\n\r\0\|\]]*)(?:\|(?<value>[^\n\r\0\]]*))?(?:\]{2})/g;

/**
 * Add support for Wikilinks
 * @returns tree transformer
 */
export default function remarkWikilink(): Transformer<Root> {
	const transformer: Transformer<Root> = (tree) => {
		findAndReplace(tree, [REGEX, parseWikilink]);
	};

	return transformer;
}

/**
 * Parse Wikilink from regex match
 * @param match
 * @returns
 */
function parseWikilink(...match: string[]): Wikilink {
	const [_raw, embed, link, value] = match;

	return {
		type: "wikilink",
		value: value ?? "",
		link: link ?? "",
		embedded: embed === "!",
	};
}
