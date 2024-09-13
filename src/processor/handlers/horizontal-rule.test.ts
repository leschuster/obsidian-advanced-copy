import { ThematicBreak } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Profile } from "src/settings/settings";
import { horizontalRule } from "./horizontal-rule";

describe("testing horizontalRule", () => {
	let profile: Profile;

	beforeEach(() => {
		profile = DEFAULT_SETTINGS.profiles["markdown_to_html"];
		profile.templates.horizontalRule = "<hr />";
	});

	test("should return horizontal rule element", () => {
		const input: ThematicBreak = {
			type: "thematicBreak",
		};
		const expected = "<hr />";
		expect(horizontalRule(input, profile)).toBe(expected);
	});
});
