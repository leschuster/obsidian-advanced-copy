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
import { visit, Visitor, VisitorResult } from "unist-util-visit";

const REGEX = /^\[!(?<type>.+)\](?<behavior>[\+\-])?( +)/;

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

export interface CalloutData extends Data {}

declare module "mdast" {
	interface RootContentMap {
		callout: Callout;
	}

	interface BlockContentMap {
		callout: Callout;
	}
}

export default function remarkCallout() {
	const transformer: Transformer<Root> = (tree) => {
		// Callouts are just special Blockquotes
		// so we only need to check all Blockquotes if they are actually Callouts
		visit(tree, "blockquote", visitor);
	};

	return transformer;
}

type Meta = Pick<Callout, "calloutType" | "closeable" | "default_open">;

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

	console.log(callout);

	replaceCurrNodeWith(callout, index, parent);
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
	console.log(match);

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

	const splitNodeAtLineBreakRec = (
		node: PhrasingContent,
	): PhrasingContent | null => {
		if ("value" in node) {
			if (!node.value.contains("\n")) {
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

		if ("children" in node) {
			const newChildren: Array<PhrasingContent> = [];
			for (const child of node.children) {
				if (!containsLineBreakRec(child)) {
					newChildren.push(child);
					continue;
				}

				const splitted = splitNodeAtLineBreakRec(child);
				if (splitted) {
					newChildren.push(splitted);
				}
				break;
			}

			if (newChildren.length === 0) {
				return null;
			}

			return {
				...node,
				children: newChildren,
				data: {},
			};
		}

		throw new Error(
			"cannot split node: node does not contain 'value' or 'children'",
		);
	};

	const title: Array<PhrasingContent> = [];

	if (node.children[0].type !== "paragraph") {
		throw new Error(
			"cannot extract callout title: first child of blockquote is not a paragraph",
		);
	}

	const paragraph = node.children[0];
	for (const child of paragraph.children) {
		if (!containsLineBreakRec(child)) {
			title.push(child);
		} else {
			const splitted = splitNodeAtLineBreakRec(child);
			if (splitted) {
				title.push(splitted);
			}
			break;
		}
	}

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
	firstText.value = firstText.value.slice(matchedText.length);
	if (firstText.value.length === 0) {
		title.splice(0, 1);
	}

	return title;
};

const extractCalloutChildren = (
	node: Blockquote,
): Array<BlockContent | DefinitionContent> => {
	// The children of a Callout are the block nodes starting after the first line break

	const splitNodeAtLineBreakRec = (
		node: PhrasingContent,
	): PhrasingContent | null => {
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

		if ("children" in node) {
			let children: Array<PhrasingContent> = [];
			let i: number;
			for (i = 0; i < node.children.length; i++) {
				const child = node.children[i];
				if (!containsLineBreakRec(child)) {
					continue;
				}

				const splitted = splitNodeAtLineBreakRec(child);
				if (splitted) {
					children.push(splitted);
				}
				break;
			}
			children = children.concat(node.children.slice(i + 1));

			if (children.length === 0) {
				return null;
			}

			return {
				...node,
				children,
				data: {},
			};
		}

		throw new Error(
			"cannot split node: node does not contain 'value' or 'children'",
		);
	};

	const splitParagraph = (node: Paragraph): Paragraph | null => {
		let children: Array<PhrasingContent> = [];
		let i: number;
		for (i = 0; i < node.children.length; i++) {
			const child = node.children[i];
			if (!containsLineBreakRec(child)) {
				console.log("PARAGRAPH:", child);
				continue;
			}

			const splitted = splitNodeAtLineBreakRec(child);
			if (splitted) {
				children.push(splitted);
			}
			break;
		}
		children = children.concat(node.children.slice(i + 1));

		if (children.length === 0) {
			return null;
		}

		return {
			...node,
			children,
			data: {},
		};
	};

	if (node.children[0].type !== "paragraph") {
		throw new Error(
			"cannot extract callout children: first child of blockquote is not a paragraph",
		);
	}

	const splitted = splitParagraph(node.children[0]);

	if (splitted) {
		return [splitted, ...node.children.slice(1)];
	} else {
		return node.children.slice(1);
	}
};

const containsLineBreakRec = (node: PhrasingContent): boolean => {
	if ("value" in node) {
		// Windows line breaks are replaced in the preprocess step of the Processor
		return node.value.contains("\n");
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
	// TODO: Right way?
	if (parent && index !== undefined) {
		parent.children.splice(index, 1, newNode);
	}
};
