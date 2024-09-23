import { InlineCode } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { codeInline } from "./code-inline";
import { CustomOptions } from "../toCustom";

describe("testing codeInline", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
        opts = { profile };
    });

    test("should return empty code element when there is no value", () => {
        const input: InlineCode = {
            type: "inlineCode",
            value: "",
        };
        const expected = "<code></code>";
        expect(codeInline(input, opts)).toBe(expected);
    });

    test("should return code element with value", () => {
        const input: InlineCode = {
            type: "inlineCode",
            value: "console.log('Hello, world!')",
        };
        const expected = "<code>console.log('Hello, world!')</code>";
        expect(codeInline(input, opts)).toBe(expected);
    });
});
