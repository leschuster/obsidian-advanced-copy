import { Root, Paragraph, Text } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Profile } from "src/settings/settings";
import { root } from "./root";
import toCustom from "../toCustom";

describe("testing root", () => {
    let profile: Profile;

    beforeEach(() => {
        profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
    });

    test("should return empty string for an empty root node", () => {
        const input: Root = {
            type: "root",
            children: [],
        };
        const expected = "";
        expect(root(input, profile)).toBe(expected);
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

        const expected = "<p>Hello </p><p>World</p>";
        expect(root(input, profile)).toBe(expected);
    });
});
