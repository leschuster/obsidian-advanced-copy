import { List, ListItem, Paragraph, Text } from "mdast";
import { list } from "./list";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { CustomOptions } from "../toCustom";

describe("testing list", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
        profile.templates.orderedList = '<ol start="$start">$content</ol>';
        profile.templates.unorderedList = "<ul>$content</ul>";
        profile.templates.listItemOrdered = "<li ordered>$value</li>";
        profile.templates.listItemUnordered = "<li unordered>$value</li>";

        opts = { profile };
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
        expect(list(input, opts)).toBe(expected);
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
        expect(list(input, opts)).toBe(expected);
    });

    test("should handle an empty ordered list", () => {
        const input: List = {
            type: "list",
            ordered: true,
            start: 1,
            children: [],
        };

        const expected = '<ol start="1"></ol>';
        expect(list(input, opts)).toBe(expected);
    });

    test("should handle an ordered list with start property", () => {
        const input: List = {
            type: "list",
            ordered: true,
            start: 200,
            children: [],
        };

        const expected = '<ol start="200"></ol>';
        expect(list(input, opts)).toBe(expected);
    });

    test("should handle an empty unordered list", () => {
        const input: List = {
            type: "list",
            ordered: false,
            children: [],
        };

        const expected = "<ul></ul>";
        expect(list(input, opts)).toBe(expected);
    });

    test("should return correct HTML for a nested ordered list", () => {
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
                },
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
                        },

                        {
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
                                                    value: "Nested item 1",
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
                                                    value: "Nested item 2",
                                                } satisfies Text,
                                            ],
                                        } satisfies Paragraph,
                                    ],
                                } satisfies ListItem,
                            ],
                        } satisfies List,
                    ],
                } satisfies ListItem,
            ],
        };

        const expected =
            '<ol start="1"><li ordered><p>First item</p></li><li ordered><p>Second item</p>\n<ol start="1"><li ordered><p>Nested item 1</p></li><li ordered><p>Nested item 2</p></li></ol></li></ol>';
        expect(list(input, opts)).toBe(expected);
    });

    test("should return correct Markdown for a nested ordered list", () => {
        opts.profile = DEFAULT_SETTINGS.profiles["markdown_to_markdown"];

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
                },
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
                        },
                        {
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
                                                    value: "Nested item 1",
                                                } satisfies Text,
                                            ],
                                        } satisfies Paragraph,
                                        {
                                            type: "list",
                                            ordered: true,
                                            start: 100,
                                            children: [
                                                {
                                                    type: "listItem",
                                                    children: [
                                                        {
                                                            type: "paragraph",
                                                            children: [
                                                                {
                                                                    type: "text",
                                                                    value: "Nested item 1.1",
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
                                                                    value: "Nested item 1.2",
                                                                } satisfies Text,
                                                            ],
                                                        } satisfies Paragraph,
                                                    ],
                                                } satisfies ListItem,
                                            ],
                                        } satisfies List,
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
                                                    value: "Nested item 2",
                                                } satisfies Text,
                                            ],
                                        } satisfies Paragraph,
                                    ],
                                } satisfies ListItem,
                            ],
                        } satisfies List,
                    ],
                } satisfies ListItem,
            ],
        };
        const expected =
            "1. First item\n2. Second item\n    1. Nested item 1\n        100. Nested item 1.1\n        101. Nested item 1.2\n    2. Nested item 2\n\n";

        expect(list(input, opts)).toBe(expected);
    });

    test("should return correct HTML for a nested unordered list", () => {
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
                },
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
                        },
                        {
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
                                                    value: "Nested item 1",
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
                                                    value: "Nested item 2",
                                                } satisfies Text,
                                            ],
                                        } satisfies Paragraph,
                                    ],
                                } satisfies ListItem,
                            ],
                        } satisfies List,
                    ],
                } satisfies ListItem,
            ],
        };

        const expected =
            "<ul><li unordered><p>First item</p></li><li unordered><p>Second item</p>\n<ul><li unordered><p>Nested item 1</p></li><li unordered><p>Nested item 2</p></li></ul></li></ul>";
        expect(list(input, opts)).toBe(expected);
    });

    test("should return correct Markdown for a nested unordered list", () => {
        opts.profile = DEFAULT_SETTINGS.profiles["markdown_to_markdown"];

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
                },
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
                        },
                        {
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
                                                    value: "Nested item 1",
                                                } satisfies Text,
                                            ],
                                        } satisfies Paragraph,
                                        {
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
                                                                    value: "Nested item 1.1",
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
                                                                    value: "Nested item 1.2",
                                                                } satisfies Text,
                                                            ],
                                                        } satisfies Paragraph,
                                                    ],
                                                } satisfies ListItem,
                                            ],
                                        } satisfies List,
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
                                                    value: "Nested item 2",
                                                } satisfies Text,
                                            ],
                                        } satisfies Paragraph,
                                    ],
                                } satisfies ListItem,
                            ],
                        } satisfies List,
                    ],
                } satisfies ListItem,
            ],
        };
        const expected =
            "-   First item\n-   Second item\n    -   Nested item 1\n        -   Nested item 1.1\n        -   Nested item 1.2\n    -   Nested item 2\n\n";

        expect(list(input, opts)).toBe(expected);
    });
});
