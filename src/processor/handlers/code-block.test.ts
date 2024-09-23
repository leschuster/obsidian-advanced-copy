import { Code } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { codeBlock } from "./code-block";
import { CustomOptions } from "../toCustom";

describe("testing codeBlock", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
        opts = { profile };
    });

    test("should return code block without language or metadata", () => {
        const input: Code = {
            type: "code",
            value: "console.log('Hello, world!');",
        };
        const expected =
            "<pre><code>console.log('Hello, world!');</code></pre>";
        expect(codeBlock(input, opts)).toBe(expected);
    });

    test("should return code block with language", () => {
        opts.profile.templates.codeBlock =
            '<pre><code class="$lang">$value</code></pre>';
        const input: Code = {
            type: "code",
            value: "console.log('Hello, world!');",
            lang: "javascript",
        };
        const expected =
            "<pre><code class=\"javascript\">console.log('Hello, world!');</code></pre>";
        expect(codeBlock(input, opts)).toBe(expected);
    });

    test("should return code block with metadata", () => {
        opts.profile.templates.codeBlock =
            '<pre><code data-meta="$meta">$value</code></pre>';
        const input: Code = {
            type: "code",
            value: "console.log('Hello, world!');",
            meta: "line-numbers",
        };
        const expected =
            "<pre><code data-meta=\"line-numbers\">console.log('Hello, world!');</code></pre>";
        expect(codeBlock(input, opts)).toBe(expected);
    });

    test("should return code block with both language and metadata", () => {
        opts.profile.templates.codeBlock =
            '<pre><code class="$lang" data-meta="$meta">$value</code></pre>';
        const input: Code = {
            type: "code",
            value: "console.log('Hello, world!');",
            lang: "javascript",
            meta: "line-numbers",
        };
        const expected =
            '<pre><code class="javascript" data-meta="line-numbers">console.log(\'Hello, world!\');</code></pre>';
        expect(codeBlock(input, opts)).toBe(expected);
    });

    test("should replace missing lang and meta with empty string", () => {
        opts.profile.templates.codeBlock =
            '<pre><code class="$lang" data-meta="$meta">$value</code></pre>';
        const input: Code = {
            type: "code",
            value: "console.log('Hello, world!');",
        };
        const expected =
            '<pre><code class="" data-meta="">console.log(\'Hello, world!\');</code></pre>';
        expect(codeBlock(input, opts)).toBe(expected);
    });
});
