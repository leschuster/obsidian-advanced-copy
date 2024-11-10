import { Highlight } from "../remark-plugins/highlight";
import { highlight } from "./highlight";
import { CustomOptions } from "../toCustom";
import { Text, Emphasis, Strong } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";

describe("testing highlight", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
        opts = { profile };
    });

    test("should return empty highlight element when there are no children", () => {
        const input: Highlight = {
            type: "highlight",
            children: [],
        };
        const expected = "<mark></mark>";
        expect(highlight(input, opts)).toBe(expected);
    });

    test("should return highlight element with text child", () => {
        const input: Highlight = {
            type: "highlight",
            children: [
                { type: "text", value: "highlighted text" } satisfies Text,
            ],
        };
        const expected = "<mark>highlighted text</mark>";
        expect(highlight(input, opts)).toBe(expected);
    });

    test("should return highlight element with multiple children", () => {
        const input: Highlight = {
            type: "highlight",
            children: [
                { type: "text", value: "highlighted " } satisfies Text,
                {
                    type: "strong",
                    children: [
                        { type: "text", value: "strong" } satisfies Text,
                    ],
                } satisfies Strong,
                { type: "text", value: " and " } satisfies Text,
                {
                    type: "emphasis",
                    children: [
                        { type: "text", value: "italic" } satisfies Text,
                    ],
                } satisfies Emphasis,
                { type: "text", value: " text" } satisfies Text,
            ],
        };
        const expected =
            "<mark>highlighted <strong>strong</strong> and <em>italic</em> text</mark>";
        expect(highlight(input, opts)).toBe(expected);
    });

    test("should handle nested highlights", () => {
        const input: Highlight = {
            type: "highlight",
            children: [
                {
                    type: "highlight",
                    children: [
                        { type: "text", value: "nested" } satisfies Text,
                    ],
                } satisfies Highlight,
                { type: "text", value: " highlight" } satisfies Text,
            ],
        };
        const expected = "<mark><mark>nested</mark> highlight</mark>";
        expect(highlight(input, opts)).toBe(expected);
    });
});
