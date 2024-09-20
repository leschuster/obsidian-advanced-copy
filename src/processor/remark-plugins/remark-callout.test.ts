import {
    Blockquote,
    Delete,
    Emphasis,
    Paragraph,
    Root,
    Strong,
    Text,
} from "mdast";
import remarkCallout, { Callout } from "./remark-callout";
import { VFile } from "vfile";

const MOCK_VFILE: VFile = new VFile();

describe("testing remark-callout", () => {
    test("should replace basic callout without title and body", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "[!info]",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "callout",
                    calloutType: "info",
                    calloutBehavior: "",
                    closeable: false,
                    default_open: true,
                    title: [],
                    children: [],
                } satisfies Callout,
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should parse callout type", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "[!warning]",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "callout",
                    calloutType: "warning",
                    calloutBehavior: "",
                    closeable: false,
                    default_open: true,
                    title: [],
                    children: [],
                } satisfies Callout,
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should handle closeable callout thats open by default", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "[!info]+",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "callout",
                    calloutType: "info",
                    calloutBehavior: "+",
                    closeable: true,
                    default_open: true,
                    title: [],
                    children: [],
                } satisfies Callout,
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should handle closeable callout thats closed by default", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "[!info]-",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "callout",
                    calloutType: "info",
                    calloutBehavior: "-",
                    closeable: true,
                    default_open: false,
                    title: [],
                    children: [],
                } satisfies Callout,
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should handle callout with text title", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "[!info] Hello World",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "callout",
                    calloutType: "info",
                    calloutBehavior: "",
                    closeable: false,
                    default_open: true,
                    title: [
                        {
                            type: "text",
                            value: "Hello World",
                        } satisfies Text,
                    ],
                    children: [],
                } satisfies Callout,
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should handle case when there is no space between closing bracket and title", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "[!info]Hello World",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "[!info]Hello World",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should handle callout with nested nodes in title", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "[!info] ",
                                } satisfies Text,
                                {
                                    type: "strong",
                                    children: [
                                        {
                                            type: "text",
                                            value: "Important",
                                        } satisfies Text,
                                    ],
                                } satisfies Strong,
                                {
                                    type: "text",
                                    value: " message",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "callout",
                    calloutType: "info",
                    calloutBehavior: "",
                    closeable: false,
                    default_open: true,
                    title: [
                        {
                            type: "strong",
                            children: [
                                {
                                    type: "text",
                                    value: "Important",
                                } satisfies Text,
                            ],
                        } satisfies Strong,
                        {
                            type: "text",
                            value: " message",
                        } satisfies Text,
                    ],
                    children: [],
                } satisfies Callout,
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should handle callout with nested title nodes but beginning with text", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "[!info] This is an ",
                                } satisfies Text,
                                {
                                    type: "strong",
                                    children: [
                                        {
                                            type: "text",
                                            value: "important",
                                        } satisfies Text,
                                    ],
                                } satisfies Strong,
                                {
                                    type: "text",
                                    value: " message",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "callout",
                    calloutType: "info",
                    calloutBehavior: "",
                    closeable: false,
                    default_open: true,
                    title: [
                        {
                            type: "text",
                            value: "This is an ",
                        } satisfies Text,
                        {
                            type: "strong",
                            children: [
                                {
                                    type: "text",
                                    value: "important",
                                } satisfies Text,
                            ],
                        } satisfies Strong,
                        {
                            type: "text",
                            value: " message",
                        } satisfies Text,
                    ],
                    children: [],
                } satisfies Callout,
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should handle callout with no title but content", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "[!info]\n",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "This is the body of the callout.",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "callout",
                    calloutType: "info",
                    calloutBehavior: "",
                    closeable: false,
                    default_open: true,
                    title: [],
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "This is the body of the callout.",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Callout,
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should handle callout with nested children", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "[!info]\n",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "emphasis",
                                    children: [
                                        {
                                            type: "text",
                                            value: "This is the body of the callout.",
                                        } satisfies Text,
                                    ],
                                } satisfies Emphasis,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "callout",
                    calloutType: "info",
                    calloutBehavior: "",
                    closeable: false,
                    default_open: true,
                    title: [],
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "emphasis",
                                    children: [
                                        {
                                            type: "text",
                                            value: "This is the body of the callout.",
                                        } satisfies Text,
                                    ],
                                } satisfies Emphasis,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Callout,
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should handle callout with multiple children", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "[!info]\n",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "First paragraph of the callout.",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "Second paragraph of the callout.",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "callout",
                    calloutType: "info",
                    calloutBehavior: "",
                    closeable: false,
                    default_open: true,
                    title: [],
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "First paragraph of the callout.",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "Second paragraph of the callout.",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Callout,
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should handle callout with both title and content", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "[!info] Title\n",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "strong",
                                    children: [
                                        {
                                            type: "text",
                                            value: "This is the body of the callout.",
                                        } satisfies Text,
                                    ],
                                } satisfies Strong,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "callout",
                    calloutType: "info",
                    calloutBehavior: "",
                    closeable: false,
                    default_open: true,
                    title: [
                        {
                            type: "text",
                            value: "Title",
                            data: {},
                        } satisfies Text,
                    ],
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "strong",
                                    children: [
                                        {
                                            type: "text",
                                            value: "This is the body of the callout.",
                                        } satisfies Text,
                                    ],
                                } satisfies Strong,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Callout,
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should handle callout with title and content in the same paragraph and deeply buried line break", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "[!info] ",
                                } satisfies Text,
                                {
                                    type: "strong",
                                    children: [
                                        {
                                            type: "text",
                                            value: "This ",
                                        } satisfies Text,
                                        {
                                            type: "emphasis",
                                            children: [
                                                {
                                                    type: "text",
                                                    value: "is ",
                                                } satisfies Text,
                                                {
                                                    type: "delete",
                                                    children: [
                                                        {
                                                            type: "text",
                                                            value: "the title\nAnd this the content",
                                                        } satisfies Text,
                                                    ],
                                                } satisfies Delete,
                                            ],
                                        } satisfies Emphasis,
                                    ],
                                } satisfies Strong,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "callout",
                    calloutType: "info",
                    calloutBehavior: "",
                    closeable: false,
                    default_open: true,
                    title: [
                        {
                            type: "strong",
                            data: {},
                            children: [
                                {
                                    type: "text",
                                    value: "This ",
                                } satisfies Text,
                                {
                                    type: "emphasis",
                                    data: {},
                                    children: [
                                        {
                                            type: "text",
                                            value: "is ",
                                        } satisfies Text,
                                        {
                                            type: "delete",
                                            data: {},
                                            children: [
                                                {
                                                    type: "text",
                                                    value: "the title",
                                                    data: {},
                                                } satisfies Text,
                                            ],
                                        } satisfies Delete,
                                    ],
                                } satisfies Emphasis,
                            ],
                        } satisfies Strong,
                    ],
                    children: [
                        {
                            type: "paragraph",
                            data: {},
                            children: [
                                {
                                    type: "strong",
                                    children: [
                                        {
                                            type: "emphasis",
                                            data: {},
                                            children: [
                                                {
                                                    type: "delete",
                                                    data: {},
                                                    children: [
                                                        {
                                                            type: "text",
                                                            value: "And this the content",
                                                            data: {},
                                                        } satisfies Text,
                                                    ],
                                                } satisfies Delete,
                                            ],
                                        } satisfies Emphasis,
                                    ],
                                    data: {},
                                } satisfies Strong,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Callout,
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should handle callout with title and content in the same paragraph", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "[!info] Title\nThis is the body of the callout.",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "callout",
                    calloutType: "info",
                    calloutBehavior: "",
                    closeable: false,
                    default_open: true,
                    title: [
                        {
                            type: "text",
                            value: "Title",
                            data: {},
                        } satisfies Text,
                    ],
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "This is the body of the callout.",
                                    data: {},
                                } satisfies Text,
                            ],
                            data: {},
                        } satisfies Paragraph,
                    ],
                } satisfies Callout,
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should not modify a normal blockquote", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "This is a normal blockquote.",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    value: "This is a normal blockquote.",
                                } satisfies Text,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should not modify a normal blockquote with empty text", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should not modify a normal blockquote no children", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [],
                } satisfies Blockquote,
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });

    test("should not modify a normal blockquote with start is Strong", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "strong",
                                    children: [
                                        {
                                            type: "text",
                                            value: "![info] This is not a callout because this is strong",
                                        } satisfies Text,
                                    ],
                                } satisfies Strong,
                            ],
                        } satisfies Paragraph,
                    ],
                } satisfies Blockquote,
            ],
        };
        const expected: Root = {
            type: "root",
            children: [
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "strong",
                                    children: [
                                        {
                                            type: "text",
                                            value: "![info] This is not a callout because this is strong",
                                        } satisfies Text,
                                    ],
                                } satisfies Strong,
                            ],
                        } satisfies Paragraph,
                    ],
                },
            ],
        };

        const transformer = remarkCallout();
        transformer(input, MOCK_VFILE, () => {}); // Modifies input

        expect(input).toEqual(expected);
    });
});
