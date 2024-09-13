import { Paragraph, Text, Emphasis } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Profile } from "src/settings/settings";
import { paragraph } from "./paragraph";
import toCustom from "../toCustom";

jest.mock("../toCustom");

describe("testing paragraph", () => {
	let profile: Profile;

	beforeEach(() => {
		profile = DEFAULT_SETTINGS.profiles["markdown_to_html"];
		profile.templates.paragraph = "<p>$value</p>";
	});

	test("should return empty paragraph element when there are no children", () => {
		const input: Paragraph = {
			type: "paragraph",
			children: [],
		};
		const expected = "<p></p>";
		expect(paragraph(input, profile)).toBe(expected);
	});

	test("should return paragraph with multiple child nodes", () => {
		const input: Paragraph = {
			type: "paragraph",
			children: [
				{ type: "text", value: "Hello" } satisfies Text,
				{ type: "text", value: "World" } satisfies Text,
			],
		};

		(toCustom as jest.Mock).mockImplementation((node) => {
			if (node.type === "text") {
				return node.value;
			}
			return "";
		});

		const expected = "<p>HelloWorld</p>";
		expect(paragraph(input, profile)).toBe(expected);
	});

	test("should handle different types of child nodes", () => {
		const input: Paragraph = {
			type: "paragraph",
			children: [
				{ type: "text", value: "Hello" } satisfies Text,
				{
					type: "emphasis",
					children: [{ type: "text", value: "World" }],
				} satisfies Emphasis,
			],
		};

		(toCustom as jest.Mock).mockImplementation((node) => {
			if (node.type === "text") {
				return node.value;
			}
			if (node.type === "emphasis") {
				return `<em>${node.children.map((child: Text) => child.value).join("")}</em>`;
			}
			return "";
		});

		const expected = "<p>Hello<em>World</em></p>";
		expect(paragraph(input, profile)).toBe(expected);
	});
});
