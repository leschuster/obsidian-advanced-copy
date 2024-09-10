import { Node } from "mdast";
import { paragraph } from "./paragraph";
import { root } from "./root";
import { text } from "./text";
import { Profile } from "src/settings/settings";

export type HandlerFunc = (node: Node, profile: Profile) => string;

export const handlers: Record<string, HandlerFunc> = {
	root,
	text,
	paragraph,
};
