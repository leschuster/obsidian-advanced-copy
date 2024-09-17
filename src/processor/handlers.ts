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
import { listItem } from "./handlers/listitem";
import { strikethrough } from "./handlers/strikethrough";
import { callout } from "./handlers/callout";

export type HandlerFunc = (node: Nodes, profile: Profile) => string;

export const handlers: Record<string, HandlerFunc> = {
	strong: bold,
	blockquote: blockquote,
	callout: callout,
	code: codeBlock,
	inlineCode: codeInline,
	heading: heading,
	thematicBreak: horizontalRule,
	image: image,
	emphasis: italic,
	break: lineBreak,
	link: link,
	list: list,
	listItem: listItem,
	math: mathBlock,
	inlineMath: mathInline,
	paragraph: paragraph,
	root: root,
	delete: strikethrough,
	text: text,
};
