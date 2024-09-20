import { Blockquote, Paragraph } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Profile } from "src/settings/settings";
import { blockquote } from "./blockquote";
import { Text } from "mdast";

describe("testing blockquote", () => {
    let profile: Profile;

    beforeEach(() => {
        profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
    });

    test("should return empty blockquote element when there are no children", () => {
        const input: Blockquote = {
            type: "blockquote",
            children: [],
        };
        const expected = "<blockquote></blockquote>";
        expect(blockquote(input, profile)).toBe(expected);
    });

    test("should return blockquote with multiple children", () => {
        profile.templates.blockquoteLine = "<line>$value</line>";
        const input: Blockquote = {
            type: "blockquote",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "Hello",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "World",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "!",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
            ],
        };
        const expected =
            "<blockquote><line><p>Hello</p></line><line><p>World</p></line><line><p>!</p></line></blockquote>";
        expect(blockquote(input, profile)).toBe(expected);
    });

    test("should return blockquote with multiple children in markdown style", () => {
        profile.templates.blockquoteWrapper = "$content";
        profile.templates.blockquoteLine = "> $value\n";
        profile.templates.paragraph = "$value";

        const input: Blockquote = {
            type: "blockquote",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "Hello",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "World",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "!",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
            ],
        };
        const expected = "> Hello\n> World\n> !\n";
        expect(blockquote(input, profile)).toBe(expected);
    });
});
