import { Text } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Profile } from "src/settings/settings";
import { text } from "./text";

describe("testing text", () => {
    let profile: Profile;

    beforeEach(() => {
        profile = DEFAULT_SETTINGS.profiles["markdown_to_html"];
        profile.templates.text = "$value";
    });

    test("should return correct string for a given text node", () => {
        const input: Text = {
            type: "text",
            value: "Hello, world!",
        };
        const expected = "Hello, world!";
        expect(text(input, profile)).toBe(expected);
    });

    test("should handle an empty text node", () => {
        const input: Text = {
            type: "text",
            value: "",
        };
        const expected = "";
        expect(text(input, profile)).toBe(expected);
    });
});
