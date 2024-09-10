import { Root } from "mdast";
import { Profile } from "src/settings/settings";
import toCustom from "../toCustom";

/**
 * Convert a root node to string
 * @param node
 * @param profile
 * @returns
 */
export function root(node: Root, profile: Profile): string {
	return node.children
		.map((child) => toCustom(child, { profile }))
		.join("\n");
}
