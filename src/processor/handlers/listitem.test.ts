import { ListItem, Text, Emphasis, Paragraph } from "mdast";
import { Profile } from "src/settings/settings";
import { listItem } from "./listitem";
import toCustom from "../toCustom";

jest.mock("../toCustom");

describe("testing listItem", () => {
	let profile: Profile;

	beforeEach(() => {
		profile = {
			templates: {
				listItem: "<li>$value</li>",
			},
		} as Profile;
	});

	test("should return correct string for a list item with multiple child nodes", () => {
		const input: ListItem = {
			type: "listItem",
			children: [
				{ type: "paragraph", children: [] } satisfies Paragraph,
				{ type: "paragraph", children: [] } satisfies Paragraph,
			],
		};

		const expected =
			"<li><mock-paragraph>...</mock-paragraph><mock-paragraph>...</mock-paragraph></li>";
		expect(listItem(input, profile)).toBe(expected);
	});

	test("should return correct string for an empty list item", () => {
		const input: ListItem = {
			type: "listItem",
			children: [],
		};
		const expected = "<li></li>";
		expect(listItem(input, profile)).toBe(expected);
	});
});
