import {
    Data,
    Literal,
    Nodes,
    Parent,
    PhrasingContent,
    Root,
    RootContent,
    Text,
} from "mdast";
import { Transformer } from "unified";
import { visit, Visitor, VisitorResult } from "unist-util-visit";
import { findAfter } from "unist-util-find-after";
import { findAllBetween } from "unist-util-find-between-all";

/**
 * Markdown highlight node.
 */
export interface Highlight extends Parent {
    /**
     * Node type of highlight.
     */
    type: "highlight";
    /**
     * Children of strong.
     */
    children: PhrasingContent[];
    /**
     * Data associated with the highlight.
     */
    data?: HighlightData | undefined;
}

export interface HighlightData extends Data {}

declare module "mdast" {
    interface RootContentMap {
        highlight: Highlight;
    }

    interface PhrasingContentMap {
        highlight: Highlight;
    }
}

const REGEX = /==/m;

/**
 * Add support for Highlight
 * @returns tree transformer
 */
export default function remarkHighlight(): Transformer<Root> {
    const transformer: Transformer<Root> = (tree) => {
        visit(tree, "text", visitor);
    };

    return transformer;
}

/**
 * Replace a text node with a highlight, if applicable
 * @param node a text node
 * @param index index of text node in parent's children property
 * @param parent text's parent node
 * @returns
 */
const visitor: Visitor<Text, Parent> = (node, index, parent): VisitorResult => {
    if (!REGEX.test(node.value)) {
        return;
    }

    const newNodes: (Nodes | Highlight)[] = [];

    while (REGEX.test(node.value)) {
        const match = REGEX.exec(node.value);

        const before = node.value.slice(0, match!.index);
        const after = node.value.slice(match!.index + 2);

        if (REGEX.test(after)) {
            // Highlight ends in this text node

            // Add text node before highlight
            if (before !== "") {
                newNodes.push({ type: "text", value: before } satisfies Text);
            }

            const afterMatch = REGEX.exec(after);

            newNodes.push({
                type: "highlight",
                children: [
                    { type: "text", value: after.slice(0, afterMatch!.index) },
                ],
            } satisfies Highlight);

            node.value = after.slice(afterMatch!.index + 2);
        } else {
            // Highlight ends in another text node or there is no closing ==

            if (parent === undefined || index === undefined) {
                throw new Error("Parent or index is undefined");
            }

            if (before !== "") {
                newNodes.push({ type: "text", value: before } satisfies Text);
            }

            const openingNode = node;

            const closingNode = findAfter(
                parent,
                openingNode,
                (node) =>
                    node.type === "text" && REGEX.test((node as Literal).value),
            ) as unknown as Text | undefined;

            if (closingNode === undefined) {
                // There is no closing ==, so the highlight is not valid
                break;
            }

            node.value = "";

            const children = findAllBetween(
                parent,
                openingNode,
                closingNode,
            ) as PhrasingContent[];

            if (after !== "") {
                children.splice(0, 0, {
                    type: "text",
                    value: after,
                } satisfies Text);
            }

            parent.children.splice(index + 1, children.length);

            const closingNodeMatch = REGEX.exec((closingNode as Literal).value);

            const closingText = (closingNode as Literal).value.slice(
                0,
                closingNodeMatch!.index,
            );

            if (closingText !== "") {
                children.push({
                    type: "text",
                    value: closingText,
                } satisfies Text);
            }

            closingNode.value = (closingNode as Literal).value.slice(
                closingNodeMatch!.index + 2,
            );

            if (closingNode.value === "") {
                parent.children.splice(parent.children.indexOf(closingNode), 1);
            }

            newNodes.push({ type: "highlight", children } satisfies Highlight);

            break;
        }
    }

    if (node.value !== "") {
        newNodes.push(node);
    }

    if (parent && index !== undefined) {
        parent.children.splice(index, 1, ...(newNodes as RootContent[]));
    }
};
