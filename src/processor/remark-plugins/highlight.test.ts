import { Root } from "mdast";
import { VFile } from "vfile";
import remarkHighlight from "./highlight";
import { Paragraph, Text } from "mdast";
import { Highlight } from "./highlight";

const MOCK_VFILE: VFile = new VFile();

describe("testing remarkHighlight", () => {
    test("should parse basic highlight", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "This is ==highlighted text==.",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
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
                            value: "This is ",
                        } satisfies Text,
                        {
                            type: "highlight",
                            children: [
                                {
                                    type: "text",
                                    value: "highlighted text",
                                } satisfies Text,
                            ],
                        } satisfies Highlight,
                        {
                            type: "text",
                            value: ".",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
            ],
        };

        const transformer = remarkHighlight();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should parse highlight with more equal signs", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "This is ====highlighted text======.",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
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
                            value: "This is ",
                        } satisfies Text,
                        {
                            type: "highlight",
                            children: [
                                {
                                    type: "text",
                                    value: "highlighted text",
                                } satisfies Text,
                            ],
                        } satisfies Highlight,
                        {
                            type: "text",
                            value: ".",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
            ],
        };

        const transformer = remarkHighlight();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should not parse unclosed ==", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "This is ==not a highlight.",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
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
                            value: "This is ==not a highlight.",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
            ],
        };

        const transformer = remarkHighlight();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should parse multiple highlights", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "This is ==highlight one== and ==highlight two==.",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
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
                            value: "This is ",
                        } satisfies Text,
                        {
                            type: "highlight",
                            children: [
                                {
                                    type: "text",
                                    value: "highlight one",
                                } satisfies Text,
                            ],
                        } satisfies Highlight,
                        {
                            type: "text",
                            value: " and ",
                        } satisfies Text,
                        {
                            type: "highlight",
                            children: [
                                {
                                    type: "text",
                                    value: "highlight two",
                                } satisfies Text,
                            ],
                        } satisfies Highlight,
                        {
                            type: "text",
                            value: ".",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
            ],
        };

        const transformer = remarkHighlight();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should parse basic highlight without text before or after", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "==highlighted text==",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "highlight",
                            children: [
                                {
                                    type: "text",
                                    value: "highlighted text",
                                } satisfies Text,
                            ],
                        } satisfies Highlight,
                    ],
                } satisfies Paragraph,
            ],
        };

        const transformer = remarkHighlight();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should parse highlight with nested elements", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "==highlighted ",
                        } satisfies Text,
                        {
                            type: "strong",
                            children: [
                                {
                                    type: "text",
                                    value: "strong",
                                } satisfies Text,
                            ],
                        },
                        {
                            type: "text",
                            value: " and ",
                        } satisfies Text,
                        {
                            type: "emphasis",
                            children: [
                                {
                                    type: "text",
                                    value: "italic",
                                } satisfies Text,
                            ],
                        },
                        {
                            type: "text",
                            value: "text==",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "highlight",
                            children: [
                                {
                                    type: "text",
                                    value: "highlighted ",
                                } satisfies Text,
                                {
                                    type: "strong",
                                    children: [
                                        {
                                            type: "text",
                                            value: "strong",
                                        } satisfies Text,
                                    ],
                                },
                                {
                                    type: "text",
                                    value: " and ",
                                } satisfies Text,
                                {
                                    type: "emphasis",
                                    children: [
                                        {
                                            type: "text",
                                            value: "italic",
                                        } satisfies Text,
                                    ],
                                },
                                {
                                    type: "text",
                                    value: "text",
                                } satisfies Text,
                            ],
                        } satisfies Highlight,
                    ],
                } satisfies Paragraph,
            ],
        };

        const transformer = remarkHighlight();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should parse highlight with nested elements and surrounding text", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "Begin ==highlighted ",
                        } satisfies Text,
                        {
                            type: "strong",
                            children: [
                                {
                                    type: "text",
                                    value: "strong",
                                } satisfies Text,
                            ],
                        },
                        {
                            type: "text",
                            value: " and ",
                        } satisfies Text,
                        {
                            type: "emphasis",
                            children: [
                                {
                                    type: "text",
                                    value: "italic",
                                } satisfies Text,
                            ],
                        },
                        {
                            type: "text",
                            value: "text== end",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
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
                            value: "Begin ",
                        } satisfies Text,
                        {
                            type: "highlight",
                            children: [
                                {
                                    type: "text",
                                    value: "highlighted ",
                                } satisfies Text,
                                {
                                    type: "strong",
                                    children: [
                                        {
                                            type: "text",
                                            value: "strong",
                                        } satisfies Text,
                                    ],
                                },
                                {
                                    type: "text",
                                    value: " and ",
                                } satisfies Text,
                                {
                                    type: "emphasis",
                                    children: [
                                        {
                                            type: "text",
                                            value: "italic",
                                        } satisfies Text,
                                    ],
                                },
                                {
                                    type: "text",
                                    value: "text",
                                } satisfies Text,
                            ],
                        } satisfies Highlight,
                        {
                            type: "text",
                            value: " end",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
            ],
        };

        const transformer = remarkHighlight();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should handle highlight spanning multiple text nodes", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "This is ==highlighted text",
                        } satisfies Text,
                        {
                            type: "text",
                            value: " that spans multiple nodes==",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
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
                            value: "This is ",
                        } satisfies Text,
                        {
                            type: "highlight",
                            children: [
                                {
                                    type: "text",
                                    value: "highlighted text",
                                } satisfies Text,
                                {
                                    type: "text",
                                    value: " that spans multiple nodes",
                                } satisfies Text,
                            ],
                        } satisfies Highlight,
                    ],
                } satisfies Paragraph,
            ],
        };

        const transformer = remarkHighlight();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should handle highlight spanning multiple text nodes with additional highlights", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "This is ==first== and ==highlighted text",
                        } satisfies Text,
                        {
                            type: "text",
                            value: " that spans multiple nodes== and ==last==.",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
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
                            value: "This is ",
                        } satisfies Text,
                        {
                            type: "highlight",
                            children: [
                                {
                                    type: "text",
                                    value: "first",
                                } satisfies Text,
                            ],
                        } satisfies Highlight,
                        {
                            type: "text",
                            value: " and ",
                        } satisfies Text,
                        {
                            type: "highlight",
                            children: [
                                {
                                    type: "text",
                                    value: "highlighted text",
                                } satisfies Text,
                                {
                                    type: "text",
                                    value: " that spans multiple nodes",
                                } satisfies Text,
                            ],
                        } satisfies Highlight,
                        {
                            type: "text",
                            value: " and ",
                        } satisfies Text,
                        {
                            type: "highlight",
                            children: [
                                {
                                    type: "text",
                                    value: "last",
                                } satisfies Text,
                            ],
                        } satisfies Highlight,
                        {
                            type: "text",
                            value: ".",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
            ],
        };

        const transformer = remarkHighlight();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should handle text with no highlights", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "This text has no highlights.",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
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
                            value: "This text has no highlights.",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
            ],
        };

        const transformer = remarkHighlight();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });
});
