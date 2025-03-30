import { Root, Paragraph, Text } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { root } from "./root";
import { CustomOptions } from "../toCustom";

describe("testing root", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
        opts = { profile };
    });

    test("should return empty string for an empty root node", () => {
        const input: Root = {
            type: "root",
            children: [],
        };
        const expected = "";
        expect(root(input, opts)).toBe(expected);
    });

    test("should return concatenated string for multiple child nodes", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        { type: "text", value: "Hello " },
                    ] satisfies Text[],
                } satisfies Paragraph,
                {
                    type: "paragraph",
                    children: [
                        { type: "text", value: "World" },
                    ] satisfies Text[],
                } satisfies Paragraph,
            ],
        };

        const expected = "<p>Hello </p>\n\n<p>World</p>";
        expect(root(input, opts)).toBe(expected);
    });
});
