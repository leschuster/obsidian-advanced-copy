import { Emphasis, Strong, Text } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Profile } from "src/settings/settings";
import { bold } from "./bold";

jest.mock("../toCustom");

describe("testing bold", () => {
	let profile: Profile;

	beforeEach(() => {
		profile = DEFAULT_SETTINGS.profiles["markdown_to_html"];
		profile.templates.bold = "<strong>$value</strong>";
	});

	test("should return empty element when there are no children", () => {
		const input: Strong = {
			type: "strong",
			children: [],
		};
		const expected = "<strong></strong>";
		expect(bold(input, profile)).toBe(expected);
	});

	test("should return bold element with multiple children", () => {
		const input: Strong = {
			type: "strong",
			children: [
				{ type: "emphasis", children: [] } satisfies Emphasis,
				{ type: "text", value: "" } satisfies Text,
			],
		};
		const expected =
			"<strong><mock-emphasis>...</mock-emphasis><mock-text>...</mock-text></strong>";
		expect(bold(input, profile)).toBe(expected);
	});
});
