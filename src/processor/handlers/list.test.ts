import { List, ListItem } from "mdast";
import { Profile } from "src/settings/settings";
import { list } from "./list";

jest.mock("../toCustom");

describe("testing list", () => {
	let profile: Profile;

	beforeEach(() => {
		profile = {
			templates: {
				orderedList: '<ol start="$start">$value</ol>',
				unorderedList: "<ul>$value</ul>",
				listItem: "<li>$value</li>",
			},
		} as Profile;
	});

	test("should return correct string for an ordered list with multiple items", () => {
		const input: List = {
			type: "list",
			ordered: true,
			children: [
				{
					type: "listItem",
					children: [],
				} satisfies ListItem,
				{
					type: "listItem",
					children: [],
				} satisfies ListItem,
			],
		};

		const expected =
			'<ol start="1"><mock-listItem>...</mock-listItem><mock-listItem>...</mock-listItem></ol>';
		expect(list(input, profile)).toBe(expected);
	});

	test("should return correct string for an unordered list with multiple items", () => {
		const input: List = {
			type: "list",
			ordered: false,
			children: [
				{
					type: "listItem",
					children: [],
				} satisfies ListItem,
				{
					type: "listItem",
					children: [],
				} satisfies ListItem,
			],
		};

		const expected =
			"<ul><mock-listItem>...</mock-listItem><mock-listItem>...</mock-listItem></ul>";
		expect(list(input, profile)).toBe(expected);
	});

	test("should handle an empty ordered list", () => {
		const input: List = {
			type: "list",
			ordered: true,
			start: 1,
			children: [],
		};

		const expected = '<ol start="1"></ol>';
		expect(list(input, profile)).toBe(expected);
	});

	test("should handle an ordered list with start property", () => {
		const input: List = {
			type: "list",
			ordered: true,
			start: 200,
			children: [],
		};

		const expected = '<ol start="200"></ol>';
		expect(list(input, profile)).toBe(expected);
	});

	test("should handle an empty unordered list", () => {
		const input: List = {
			type: "list",
			ordered: false,
			children: [],
		};

		const expected = "<ul></ul>";
		expect(list(input, profile)).toBe(expected);
	});
});
