import { Paragraph, Text, Emphasis } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Profile } from "src/settings/settings";
import { paragraph } from "./paragraph";
import toCustom from "../toCustom";

describe("testing paragraph", () => {
    let profile: Profile;

    beforeEach(() => {
        profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
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
                { type: "text", value: " World" } satisfies Text,
            ],
        };

        const expected = "<p>Hello World</p>";
        expect(paragraph(input, profile)).toBe(expected);
    });

    test("should handle different types of child nodes", () => {
        const input: Paragraph = {
            type: "paragraph",
            children: [
                { type: "text", value: "Hello " } satisfies Text,
                {
                    type: "emphasis",
                    children: [{ type: "text", value: "World" }],
                } satisfies Emphasis,
            ],
        };

        const expected = "<p>Hello <em>World</em></p>";
        expect(paragraph(input, profile)).toBe(expected);
    });
});
