// @ts-nocheck

import { Nodes } from "mdast";
import { Profile } from "src/settings/settings";
import { blockquote } from "./handlers/blockquote";
import { codeBlock } from "./handlers/code-block";
import { codeInline } from "./handlers/code-inline";
import { heading } from "./handlers/heading";
import { horizontalRule } from "./handlers/horizontal-rule";
import { image } from "./handlers/image";
import { italic } from "./handlers/italic";
import { lineBreak } from "./handlers/lineBreak";
import { link } from "./handlers/link";
import { mathBlock } from "./handlers/math-block";
import { mathInline } from "./handlers/math-inline";
import { paragraph } from "./handlers/paragraph";
import { root } from "./handlers/root";
import { bold } from "./handlers/bold";
import { text } from "./handlers/text";
import { list } from "./handlers/list";
import { strikethrough } from "./handlers/strikethrough";
import { callout } from "./handlers/callout";
import { wikilink } from "./handlers/wikilink";
import { CustomOptions } from "./toCustom";
import { highlight } from "./handlers/highlight";
import { table } from "./handlers/table";

export type HandlerFunc = (node: Nodes, options: CustomOptions) => string;

/**
 * Mapping of node type to handler function.
 */
export const handlers: Record<string, HandlerFunc> = {
    strong: bold,
    blockquote,
    callout,
    code: codeBlock,
    inlineCode: codeInline,
    heading,
    highlight,
    thematicBreak: horizontalRule,
    image,
    emphasis: italic,
    break: lineBreak,
    link,
    list,
    math: mathBlock,
    inlineMath: mathInline,
    paragraph,
    root,
    delete: strikethrough,
    table,
    text,
    wikilink,
};
