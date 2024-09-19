import { Root } from "mdast";
import { VFile } from "vfile";
import remarkWikilink from "./wikilink";

const MOCK_VFILE: VFile = new VFile();

describe("testing remarkWikilink", () => {
    test("should parse basic wikilink", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "[[Basic formatting syntax#Code blocks|Code blocks]]",
                        },
                    ],
                },
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "wikilink",
                            value: "Code blocks",
                            link: "Basic formatting syntax#Code blocks",
                            embedded: false,
                        },
                    ],
                },
            ],
        };

        const transformer = remarkWikilink();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should parse embedded wikilink", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "![[Basic formatting syntax#Code blocks|Code blocks]]",
                        },
                    ],
                },
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "wikilink",
                            value: "Code blocks",
                            link: "Basic formatting syntax#Code blocks",
                            embedded: true,
                        },
                    ],
                },
            ],
        };

        const transformer = remarkWikilink();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should parse wikilink without display text", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "[[Basic formatting syntax#Code blocks]]",
                        },
                    ],
                },
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "wikilink",
                            value: "",
                            link: "Basic formatting syntax#Code blocks",
                            embedded: false,
                        },
                    ],
                },
            ],
        };

        const transformer = remarkWikilink();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should parse embedded wikilink without display text", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "![[Basic formatting syntax#Code blocks]]",
                        },
                    ],
                },
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "wikilink",
                            value: "",
                            link: "Basic formatting syntax#Code blocks",
                            embedded: true,
                        },
                    ],
                },
            ],
        };

        const transformer = remarkWikilink();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should handle multiple wikilinks in a paragraph", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "[[Link1]] and [[Link2|Display Text]]",
                        },
                    ],
                },
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "wikilink",
                            value: "",
                            link: "Link1",
                            embedded: false,
                        },
                        {
                            type: "text",
                            value: " and ",
                        },
                        {
                            type: "wikilink",
                            value: "Display Text",
                            link: "Link2",
                            embedded: false,
                        },
                    ],
                },
            ],
        };

        const transformer = remarkWikilink();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should handle wikilink with special characters", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "[[Link with special characters!@#$%^&*()|Display]]",
                        },
                    ],
                },
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "wikilink",
                            value: "Display",
                            link: "Link with special characters!@#$%^&*()",
                            embedded: false,
                        },
                    ],
                },
            ],
        };

        const transformer = remarkWikilink();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should parse embedded wikilink in the middle of text", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "This is an ![[Link|embedded wikilink]] in the middle of text.",
                        },
                    ],
                },
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "This is an ",
                        },
                        {
                            type: "wikilink",
                            value: "embedded wikilink",
                            link: "Link",
                            embedded: true,
                        },
                        {
                            type: "text",
                            value: " in the middle of text.",
                        },
                    ],
                },
            ],
        };

        const transformer = remarkWikilink();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should parse wikilink enclosed in strong", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "strong",
                            children: [
                                {
                                    type: "text",
                                    value: "[[Link|strong wikilink]]",
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "strong",
                            children: [
                                {
                                    type: "wikilink",
                                    value: "strong wikilink",
                                    link: "Link",
                                    embedded: false,
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        const transformer = remarkWikilink();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });
});
