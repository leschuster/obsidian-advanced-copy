import { InlineCode } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Profile } from "src/settings/settings";
import { codeInline } from "./code-inline";

jest.mock("../toCustom");

describe("testing codeInline", () => {
	let profile: Profile;

	beforeEach(() => {
		profile = DEFAULT_SETTINGS.profiles["markdown_to_html"];
		profile.templates.codeInline = "<code>$value</code>";
	});

	test("should return empty code element when there is no value", () => {
		const input: InlineCode = {
			type: "inlineCode",
			value: "",
		};
		const expected = "<code></code>";
		expect(codeInline(input, profile)).toBe(expected);
	});

	test("should return code element with value", () => {
		const input: InlineCode = {
			type: "inlineCode",
			value: "console.log('Hello, world!')",
		};
		const expected = "<code>console.log('Hello, world!')</code>";
		expect(codeInline(input, profile)).toBe(expected);
	});
});