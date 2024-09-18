import {
	BlockContent,
	Blockquote,
	Data,
	DefinitionContent,
	Paragraph,
	Parent,
	PhrasingContent,
	Root,
} from "mdast";
import { Transformer } from "unified";
import { SKIP, visit, Visitor, VisitorResult } from "unist-util-visit";

const REGEX = /^\[!(?<type>.+)\](?<behavior>[\+\-])?(?=(( )+)|\n|$)/;

/**
 * Markdown Callout node parsed from Obsidian syntax.
 */
export interface Callout extends Parent {
	/**
	 * Node type of callout.
	 */
	type: "callout";
	/**
	 * Type of callout (e.g. "warning", "info" etc.)
	 */
	calloutType: string;
	/**
	 * Whether the callout can be closed.
	 */
	closeable: boolean;
	/**
	 * Whether the callout is open by default (only applicable if closable == true).
	 */
	default_open: boolean;
	/**
	 * Title of callout.
	 */
	title: Array<PhrasingContent>;
	/**
	 * Children of callout.
	 */
	children: Array<BlockContent | DefinitionContent>;
	/**
	 * Data associated with the callout.
	 */
	data?: CalloutData | undefined;
}

/**
 * Subset of Callout properties concerned with Callout's metadata
 */
type Meta = Pick<Callout, "calloutType" | "closeable" | "default_open">;

export interface CalloutData extends Data {}

declare module "mdast" {
	interface RootContentMap {
		callout: Callout;
	}

	interface BlockContentMap {
		callout: Callout;
	}
}

/**
 * Add support for Callouts
 * @returns tree transformer
 */
export default function remarkCallout(): Transformer<Root> {
	const transformer: Transformer<Root> = (tree) => {
		// Callouts are just special Blockquotes
		// so we only need to check all Blockquotes if they are actually Callouts
		visit(tree, "blockquote", visitor);
	};

	return transformer;
}

/**
 * Replace a Blockquote node with a Callout, if applicable
 * @param node a Blockquote node
 * @param index index of Blockquote in parent's children property
 * @param parent Blockquote's parent node
 * @returns
 */
const visitor: Visitor<Blockquote, Parent> = (
	node,
	index,
	parent,
): VisitorResult => {
	const meta = extractMetaInfoOfPossibleCallout(node);
	if (!meta) {
		// Well, it's just a regular blockquote
		return;
	}

	const title = extractCalloutTitle(node);
	const children = extractCalloutChildren(node);

	const callout: Callout = {
		type: "callout",
		...meta,
		title,
		children,
	};

	replaceCurrNodeWith(callout, index, parent);

	// If we were to return nothing, the utility would also visit node.children
	// and possibly replace Blockquotes with Callouts in the _original_ node.
	// When you have two nested Callouts both would be visited and replaced,
	// but the inner Callout would be replaced in the original node, not the outer one.
	//
	// We return SKIP to say that node.children should _not_ be visisted. By returning the `index`
	// the newly created Callout gets visited again (nothing happens because it's not a Blockquote anymore)
	// and the children Blockquotes get correctly replaced.
	return [SKIP, index];
};

/**
 * Extract meta information of a possible Callout.
 * @param node Blockquote node
 * @returns meta information or null if it's not a Callout
 */
const extractMetaInfoOfPossibleCallout = (node: Blockquote): Meta | null => {
	// A Callout is a Blockquote that starts with '![<type>]' in the first line
	// Because that's raw text, the first child must be a Paragraph containing
	// a Text node as its first child.

	if (node.children.length === 0 || node.children[0].type !== "paragraph") {
		return null;
	}

	const paragraph = node.children[0];
	if (
		paragraph.children.length === 0 ||
		paragraph.children[0].type !== "text"
	) {
		return null;
	}

	const textStart = paragraph.children[0].value;

	// Extract meta information with regex
	const match = REGEX.exec(textStart);
	if (!match) {
		// Well, it's not a Callout then
		return null;
	}

	const calloutType = match?.groups?.type ?? "";
	const calloutBehavior = match?.groups?.behavior ?? "";
	const closeable = calloutBehavior === "+" || calloutBehavior === "-";
	const default_open = calloutBehavior !== "-";

	return {
		calloutType,
		closeable,
		default_open,
	};
};

/**
 * Extract title subtree for Callout node
 * @param node Blockquote node
 * @returns subtree that represents the title of the Callout
 */
const extractCalloutTitle = (node: Blockquote): Array<PhrasingContent> => {
	// The title of a Callout terminates with the first line break or the end of the Blockquote.
	//
	// Problem: The title may not be simple text for it can contain other
	// nodes like Strong or Emphasis, but no block content.
	//
	// Idea: Depth-First-Search to find the first Literal containing a line break.

	if (node.children[0].type !== "paragraph") {
		throw new Error(
			"cannot extract callout title: first child of blockquote is not a paragraph",
		);
	}

	// We only need to look at the first block, which definitely is a Paragraph
	const title = getParagraphChildrenUntilLineBreak(node.children[0]);

	if (title.length === 0 || title[0].type !== "text") {
		throw new Error(
			"the title has no elements or the first one is not a text node",
		);
		// Cannot be possible, because of '![<type>]' at the beginning
	}

	// Remove '![<type>]' from the beginning
	const firstText = title[0];
	const match = REGEX.exec(firstText.value);
	if (match === null) {
		throw new Error(
			"the first title element does not match callout syntax",
		);
	}
	const matchedText = match[0];
	firstText.value = firstText.value.slice(matchedText.length).trimStart();
	if (firstText.value.length === 0) {
		title.splice(0, 1);
	}

	return title;

	/**
	 * Return nodes until the first line break.
	 * The node with the line break is split.
	 * @param node paragraph node
	 */
	function getParagraphChildrenUntilLineBreak(
		node: Paragraph,
	): Array<PhrasingContent> {
		const children: Array<PhrasingContent> = [];

		for (const child of node.children) {
			if (!containsLineBreakRec(child)) {
				children.push(child);
			} else {
				const splitted = getSubtreeBeforeLineBreak(child);
				if (splitted) {
					children.push(splitted);
				}
				break;
			}
		}

		return children;
	}

	/**
	 * Splits the tree at the first line break and returns the part before that
	 * @param node
	 * @returns node or null, if node would be empty
	 */
	function getSubtreeBeforeLineBreak(
		node: PhrasingContent,
	): PhrasingContent | null {
		// Handle leaf
		if ("value" in node) {
			if (!node.value.includes("\n")) {
				return node;
			}

			const valueUntilLineBreak = node.value.slice(
				0,
				node.value.indexOf("\n"),
			);

			if (valueUntilLineBreak === "") {
				// Do not add an empty element
				return null;
			}

			return {
				...node,
				value: valueUntilLineBreak,
				data: {},
			};
		}

		// Handle inner node
		if ("children" in node) {
			const children: Array<PhrasingContent> = [];
			for (const child of node.children) {
				if (!containsLineBreakRec(child)) {
					children.push(child);
					continue;
				}

				const splitted = getSubtreeBeforeLineBreak(child);
				if (splitted) {
					children.push(splitted);
				}
				break;
			}

			if (children.length === 0) {
				return null;
			}

			return {
				...node,
				children,
				data: {},
			};
		}

		return null;
	}
};

/**
 * Extract children for Callout node
 * @param node Blockquote node
 * @returns Array of children nodes
 */
const extractCalloutChildren = (
	node: Blockquote,
): Array<BlockContent | DefinitionContent> => {
	// The children of a Callout are the block nodes starting after the first line break
	//
	// Idea: The first child of node must be a Paragraph. Perform DFS search for first line break
	// and only keep the subtree after the line break. All other node.children can be kept.

	if (node.children[0].type !== "paragraph") {
		throw new Error(
			"cannot extract callout children: first child of blockquote is not a paragraph",
		);
	}

	const splittedParagraph = getParagraphAfterLineBreak(node.children[0]);

	if (splittedParagraph) {
		return [splittedParagraph, ...node.children.slice(1)];
	} else {
		return node.children.slice(1);
	}

	/**
	 * Split Paragraph node at the first line break and return the second half
	 * as a new Paragrah.
	 * @param node Paragraph node
	 * @returns Paragraph node or null, if it would be empty
	 */
	function getParagraphAfterLineBreak(node: Paragraph): Paragraph | null {
		let i: number;
		for (i = 0; i < node.children.length; i++) {
			if (containsLineBreakRec(node.children[i])) {
				break;
			}
		}

		if (i >= node.children.length) {
			// No line break found
			return null;
		}

		const splitted = getSubtreeAfterLineBreak(node.children[i]);

		let children: Array<PhrasingContent>;
		if (splitted) {
			children = [splitted, ...node.children.slice(i + 1)];
		} else {
			children = node.children.slice(i + 1);
		}

		if (children.length === 0) {
			return null;
		}

		return {
			...node,
			children,
			data: {},
		};
	}

	/**
	 * Splits the tree at the first line break and returns the second part
	 * @param node
	 * @returns node or null, if node would be empty
	 */
	function getSubtreeAfterLineBreak(
		node: PhrasingContent,
	): PhrasingContent | null {
		// Handle leaf
		if ("value" in node) {
			const valueAfterLineBreak = node.value.slice(
				node.value.indexOf("\n") + 1,
			);

			if (valueAfterLineBreak === "") {
				return null;
			}

			return {
				...node,
				value: valueAfterLineBreak,
				data: {},
			};
		}

		// Handle inner node
		if ("children" in node) {
			let i: number;
			for (i = 0; i < node.children.length; i++) {
				if (containsLineBreakRec(node.children[i])) {
					break;
				}
			}

			if (i >= node.children.length) {
				// No line breaks found
				return null;
			}

			const splitted = getSubtreeAfterLineBreak(node.children[i]);

			let children: Array<PhrasingContent>;
			if (splitted) {
				children = [splitted, ...node.children.slice(i + 1)];
			} else {
				children = node.children.slice(i + 1);
			}

			if (children.length === 0) {
				return null;
			}

			return {
				...node,
				children,
				data: {},
			};
		}

		return null;
	}
};

/**
 * Helper function to determine if a node contains a line break or not
 * @param node
 * @returns
 */
const containsLineBreakRec = (node: PhrasingContent): boolean => {
	if ("value" in node) {
		// Windows line breaks are replaced in the preprocess step of the Processor
		return node.value.includes("\n");
	}
	if ("children" in node) {
		for (const child of node.children) {
			if (containsLineBreakRec(child)) {
				return true;
			}
		}
		return false;
	}

	return false;
};

/**
 * Replace current node with a new node.
 * @param newNode new Callout node
 * @param index index of current node in parent's children array
 * @param parent parent node of current node
 */
const replaceCurrNodeWith = (
	newNode: Callout,
	index: number | undefined,
	parent: Parent | undefined,
): void => {
	if (parent && index !== undefined) {
		parent.children.splice(index, 1, newNode);
	}
};
