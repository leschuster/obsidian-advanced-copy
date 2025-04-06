import he from "he";
import { Root, Text } from "mdast";
import { Transformer } from "unified";
import { visit, Visitor, VisitorResult } from "unist-util-visit";

export default function remarkEncodeHTMLEntities(
    options?: he.EncodeOptions,
): Transformer<Root> {
    const visitor: Visitor<Text> = (node, _index, _parent): VisitorResult => {
        node.value = he.encode(node.value, options);
    };

    const transformer: Transformer<Root> = (tree) => {
        visit(tree, "text", visitor);
    };

    return transformer;
}
