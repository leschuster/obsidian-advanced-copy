import { Root } from "mdast";
import { VFile } from "vfile";
import remarkEncodeHTMLEntities from "./encode-html-entities";

const MOCK_VFILE: VFile = new VFile();

describe("testing encode-html-entities", () => {
    it("should encode HTML entities", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "This is a test with <html> entities & symbols like © and ™.",
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
                            value: "This is a test with &#x3C;html&#x3E; entities &#x26; symbols like &#xA9; and &#x2122;.",
                        },
                    ],
                },
            ],
        };

        const transformer = remarkEncodeHTMLEntities();
        transformer(input, MOCK_VFILE, () => {});

        expect(input).toEqual(expected);
    });

    it("should encode HTML entities with options", () => {
        const input: Root = {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "This is a test with <html> entities & symbols like © and ™.",
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
                            value: "This is a test with &lt;html&gt; entities &amp; symbols like &copy; and &trade;.",
                        },
                    ],
                },
            ],
        };

        const transformer = remarkEncodeHTMLEntities({
            useNamedReferences: true,
        });
        transformer(input, MOCK_VFILE, () => {});

        expect(input).toEqual(expected);
    });
});
