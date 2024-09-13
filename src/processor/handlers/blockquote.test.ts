import { Blockquote, Paragraph } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Profile } from "src/settings/settings";
import { blockquote } from "./blockquote";

jest.mock("../toCustom");

describe("testing blockquote", () => {
	let profile: Profile;

	beforeEach(() => {
		profile = DEFAULT_SETTINGS.profiles["markdown_to_html"];
		profile.templates.blockquoteWrapper = "<blockquote>$value</blockquote>";
		profile.templates.blockquoteLine = "<line>$value</line>";
	});

	test("should return empty blockquote element when there are no children", () => {
		const input: Blockquote = {
			type: "blockquote",
			children: [],
		};
		const expected = "<blockquote></blockquote>";
		expect(blockquote(input, profile)).toBe(expected);
	});

	test("should return blockquote with multiple children", () => {
		const input: Blockquote = {
			type: "blockquote",
			children: [
				{
					type: "paragraph",
					children: [],
				} satisfies Paragraph,
				{
					type: "paragraph",
					children: [],
				} satisfies Paragraph,
				{
					type: "paragraph",
					children: [],
				} satisfies Paragraph,
			],
		};
		const expected =
			"<blockquote><line><mock-paragraph>...</mock-paragraph></line><line><mock-paragraph>...</mock-paragraph></line><line><mock-paragraph>...</mock-paragraph></line></blockquote>";
		expect(blockquote(input, profile)).toBe(expected);
	});

	test("should return blockquote with multiple children in markdown style", () => {
		profile.templates.blockquoteWrapper = "$value";
		profile.templates.blockquoteLine = "> $value\n";

		const input: Blockquote = {
			type: "blockquote",
			children: [
				{
					type: "paragraph",
					children: [],
				} satisfies Paragraph,
				{
					type: "paragraph",
					children: [],
				} satisfies Paragraph,
				{
					type: "paragraph",
					children: [],
				} satisfies Paragraph,
			],
		};
		const expected =
			"> <mock-paragraph>...</mock-paragraph>\n> <mock-paragraph>...</mock-paragraph>\n> <mock-paragraph>...</mock-paragraph>\n";
		expect(blockquote(input, profile)).toBe(expected);
	});
});
