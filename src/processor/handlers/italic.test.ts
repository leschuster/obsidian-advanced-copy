import { Emphasis, Text } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Profile } from "src/settings/settings";
import { italic } from "./italic";

jest.mock("../toCustom");

describe("testing italic", () => {
	let profile: Profile;

	beforeEach(() => {
		profile = DEFAULT_SETTINGS.profiles["markdown_to_html"];
		profile.templates.italic = "<em>$value</em>";
	});

	test("should return empty element when there are no children", () => {
		const input: Emphasis = {
			type: "emphasis",
			children: [],
		};
		const expected = "<em></em>";
		expect(italic(input, profile)).toBe(expected);
	});

	test("should return italic element with multiple children", () => {
		const input: Emphasis = {
			type: "emphasis",
			children: [
				{ type: "emphasis", children: [] } satisfies Emphasis,
				{ type: "text", value: "" } satisfies Text,
			],
		};
		const expected =
			"<em><mock-emphasis>...</mock-emphasis><mock-text>...</mock-text></em>";
		expect(italic(input, profile)).toBe(expected);
	});
});
