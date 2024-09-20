import { List, ListItem, Paragraph, Text } from "mdast";
import { Profile } from "src/settings/settings";
import { list } from "./list";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";

describe("testing list", () => {
    let profile: Profile;

    beforeEach(() => {
        profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
        profile.templates.orderedList = '<ol start="$start">$content</ol>';
        profile.templates.unorderedList = "<ul>$content</ul>";
        profile.templates.listItemOrdered = "<li ordered>$value</li>";
        profile.templates.listItemUnordered = "<li unordered>$value</li>";
    });

    test("should return correct string for an ordered list with multiple items", () => {
        const input: List = {
            type: "list",
            ordered: true,
            children: [
                {
                    type: "listItem",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "First item",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies ListItem,
                {
                    type: "listItem",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "Second item",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies ListItem,
            ],
        };

        const expected =
            '<ol start="1"><li ordered><p>First item</p></li><li ordered><p>Second item</p></li></ol>';
        expect(list(input, profile)).toBe(expected);
    });

    test("should return correct string for an unordered list with multiple items", () => {
        const input: List = {
            type: "list",
            ordered: false,
            children: [
                {
                    type: "listItem",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "First item",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies ListItem,
                {
                    type: "listItem",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "Second item",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies ListItem,
            ],
        };

        const expected =
            "<ul><li unordered><p>First item</p></li><li unordered><p>Second item</p></li></ul>";
        expect(list(input, profile)).toBe(expected);
    });

    test("should handle an empty ordered list", () => {
        const input: List = {
            type: "list",
            ordered: true,
            start: 1,
            children: [],
        };

        const expected = '<ol start="1"></ol>';
        expect(list(input, profile)).toBe(expected);
    });

    test("should handle an ordered list with start property", () => {
        const input: List = {
            type: "list",
            ordered: true,
            start: 200,
            children: [],
        };

        const expected = '<ol start="200"></ol>';
        expect(list(input, profile)).toBe(expected);
    });

    test("should handle an empty unordered list", () => {
        const input: List = {
            type: "list",
            ordered: false,
            children: [],
        };

        const expected = "<ul></ul>";
        expect(list(input, profile)).toBe(expected);
    });
});
