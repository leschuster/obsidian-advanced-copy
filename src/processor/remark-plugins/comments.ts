import {
    Data,
    Literal,
    Parent,
    PhrasingContent,
    Root,
    Text,
    Nodes,
    RootContent,
} from "mdast";
import { findAndReplace } from "mdast-util-find-and-replace";
import { Transformer } from "unified";
import { visit, Visitor, VisitorResult } from "unist-util-visit";
import { findAfter } from "unist-util-find-after";
import { findAllBetween } from "unist-util-find-between-all";

/**
 * Markdown Comment node parsed from Obsidian syntax.
 */
export interface Comment extends Parent {
    /**
     * Node type of Comment.
     */
    type: "comment";
    /**
     * Children Comment.
     */
    children: PhrasingContent[];
    /**
     * Data associated with the Comment.
     */
    data?: CommentData | undefined;
}

export interface CommentData extends Data {}

declare module "mdast" {
    interface RootContentMap {
        comment: Comment;
    }

    interface PhrasingContentMap {
        comment: Comment;
    }
}

//const REGEX = /%%(?<value>[^%]*)%%/gms;
const REGEX = /%%+/m;

/**
 * Add support for Comments
 * @returns tree transformer
 */
export default function remarkComment(): Transformer<Root> {
    /*const transformer: Transformer<Root> = (tree) => {
        findAndReplace(tree, [REGEX, parseComment]);
    };*/
    const transformer: Transformer<Root> = (tree) => {
        visit(tree, "text", visitor);
    };

    return transformer;
}

/**
 * Replace a text node with a comment node, if applicable
 * @param node a text node
 * @param index index of text node in parent's children property
 * @param parent text's parent node
 * @returns
 */
const visitor: Visitor<Text, Parent> = (node, index, parent): VisitorResult => {
    // Quick check if the text node contains a comment
    if (!REGEX.test(node.value)) {
        return;
    }

    if (parent === undefined || index === undefined) {
        // This is a Text node, so parent and index must exist
        throw new Error("Parent or index is undefined");
    }

    const nodes = extractComments(node, index, parent);

    // Replace the text node with the new nodes
    parent.children.splice(index, 1, ...(nodes as RootContent[]));
};

const extractComments = (
    node: Text,
    index: number,
    parent: Parent,
): (Nodes | Highlight)[] => {
    return [
        ...extractAllContainedComments(node),
        ...extractCommentFromMultipleNodes(node, index, parent),
    ];
};

/**
 * Extract all comments that begin and end in the same text node
 * Modifies the node to leave only the text that is not part of a comment
 * @param node Text node
 * @returns List of nodes
 */
const extractAllContainedComments = (node: Text): (Nodes | Highlight)[] => {
    const nodes: (Nodes | Highlight)[] = [];

    while (REGEX.test(node.value)) {
        // There is an opening %%

        const match = REGEX.exec(node.value);
        const matchLen = match![0].length;
        const before = node.value.slice(0, match!.index);
        const after = node.value.slice(match!.index + matchLen);

        if (!REGEX.test(after)) {
            // Comment ends in another text node or there is no closing %%
            break;
        }

        // Comment ends in this text node

        const match2nd = REGEX.exec(after);
        const match2ndLen = match2nd![0].length;
        const after2nd = after.slice(match2nd!.index + match2ndLen);

        // Add text node before comment
        if (before !== "") {
            nodes.push({ type: "text", value: before } as Text);
        }

        // Add comment node
        const value = after.slice(0, match2nd!.index);
        if (value !== "") {
            nodes.push({
                type: "comment",
                children: [{ type: "text", value } satisfies Text],
            } satisfies Comment);
        }

        // Update text node
        node.value = after2nd;
    }

    return nodes;
};

/**
 * Extract a comment that begins in one text node and ends in another
 * @param node current text node
 * @param index index of text node in parent's children property
 * @param parent parent node of text node
 * @returns nodes
 */
const extractCommentFromMultipleNodes = (
    node: Text,
    index: number,
    parent: Parent,
): (Nodes | Highlight)[] => {
    if (node.value === "") {
        return [];
    }

    if (!REGEX.test(node.value)) {
        // Nothing left to do
        return [node];
    }

    const nodes: (Nodes | Highlight)[] = [];

    const openingNode = node;

    const closingNode = findAfter(
        parent,
        openingNode,
        (node) => node.type === "text" && REGEX.test((node as Literal).value),
    ) as unknown as Text | undefined;

    if (closingNode === undefined) {
        // There is no closing %%, so the comment is not valid
        return [node];
    }

    const match1st = REGEX.exec(node.value);
    const match1stLen = match1st![0].length;
    const before1st = node.value.slice(0, match1st!.index);
    const after1st = node.value.slice(match1st!.index + match1stLen);

    const between = findAllBetween(
        parent,
        openingNode,
        closingNode,
    ) as PhrasingContent[];

    const match2nd = REGEX.exec(closingNode.value);
    const match2ndLen = match2nd![0].length;
    const before2nd = closingNode.value.slice(0, match2nd!.index);
    const after2nd = closingNode.value.slice(match2nd!.index + match2ndLen);

    // Add text node before comment
    if (before1st !== "") {
        nodes.push({ type: "text", value: before1st } as Text);
    }

    // Add comment node
    const comment: Comment = { type: "comment", children: [] };
    if (after1st !== "") {
        comment.children.push({ type: "text", value: after1st } as Text);
    }

    comment.children = comment.children.concat(between);

    if (before2nd !== "") {
        comment.children.push({ type: "text", value: before2nd } as Text);
    }

    if (comment.children.length > 0) {
        nodes.push(comment);
    }

    // Remove nodes between opening and closing %% from parent
    parent.children.splice(index + 1, between.length);

    // Update closing node
    closingNode.value = after2nd;

    // Remove closing node if it is empty
    if (closingNode.value === "") {
        parent.children.splice(parent.children.indexOf(closingNode), 1);
    }

    return nodes;
};
