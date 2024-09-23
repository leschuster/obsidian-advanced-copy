import { Blockquote, Paragraph } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { blockquote } from "./blockquote";
import { Text } from "mdast";
import { CustomOptions } from "../toCustom";

describe("testing blockquote", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
        opts = { profile };
    });

    test("should return empty blockquote element when there are no children", () => {
        const input: Blockquote = {
            type: "blockquote",
            children: [],
        };
        const expected = "<blockquote></blockquote>";
        expect(blockquote(input, opts)).toBe(expected);
    });

    test("should return blockquote with multiple children", () => {
        opts.profile.templates.blockquoteLine = "<line>$value</line>";
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
        expect(blockquote(input, opts)).toBe(expected);
    });

    test("should return blockquote with multiple children in markdown style", () => {
        opts.profile.templates.blockquoteWrapper = "$content";
        opts.profile.templates.blockquoteLine = "> $value\n";
        opts.profile.templates.paragraph = "$value";
        opts.profile.templates.paragraphNested = "$value";

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
        expect(blockquote(input, opts)).toBe(expected);
    });
});
