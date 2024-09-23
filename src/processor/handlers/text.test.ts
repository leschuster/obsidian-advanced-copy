import { Text } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { text } from "./text";
import { CustomOptions } from "../toCustom";

describe("testing text", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = DEFAULT_SETTINGS.profiles["markdown_to_html"];
        opts = { profile };
    });

    test("should return correct string for a given text node", () => {
        const input: Text = {
            type: "text",
            value: "Hello, world!",
        };
        const expected = "Hello, world!";
        expect(text(input, opts)).toBe(expected);
    });

    test("should handle an empty text node", () => {
        const input: Text = {
            type: "text",
            value: "",
        };
        const expected = "";
        expect(text(input, opts)).toBe(expected);
    });
});
