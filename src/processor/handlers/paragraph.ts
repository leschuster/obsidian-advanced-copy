import { Paragraph } from "mdast";
import { Profile } from "src/settings/settings";
import toCustom from "../toCustom";

// Convert a paragraph node to string
export function paragraph(node: Paragraph, profile: Profile): string {
	const content = node.children
		.map((child) => toCustom(child, { profile }))
		.join("");

	return profile.paragraph.replaceAll("$0", content);
}
