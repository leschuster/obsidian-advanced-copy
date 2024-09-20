import { Code } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Profile } from "src/settings/settings";
import { codeBlock } from "./code-block";

describe("testing codeBlock", () => {
    let profile: Profile;

    beforeEach(() => {
        profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
    });

    test("should return code block without language or metadata", () => {
        const input: Code = {
            type: "code",
            value: "console.log('Hello, world!');",
        };
        const expected =
            "<pre><code>console.log('Hello, world!');</code></pre>";
        expect(codeBlock(input, profile)).toBe(expected);
    });

    test("should return code block with language", () => {
        profile.templates.codeBlock =
            '<pre><code class="$lang">$value</code></pre>';
        const input: Code = {
            type: "code",
            value: "console.log('Hello, world!');",
            lang: "javascript",
        };
        const expected =
            "<pre><code class=\"javascript\">console.log('Hello, world!');</code></pre>";
        expect(codeBlock(input, profile)).toBe(expected);
    });

    test("should return code block with metadata", () => {
        profile.templates.codeBlock =
            '<pre><code data-meta="$meta">$value</code></pre>';
        const input: Code = {
            type: "code",
            value: "console.log('Hello, world!');",
            meta: "line-numbers",
        };
        const expected =
            "<pre><code data-meta=\"line-numbers\">console.log('Hello, world!');</code></pre>";
        expect(codeBlock(input, profile)).toBe(expected);
    });

    test("should return code block with both language and metadata", () => {
        profile.templates.codeBlock =
            '<pre><code class="$lang" data-meta="$meta">$value</code></pre>';
        const input: Code = {
            type: "code",
            value: "console.log('Hello, world!');",
            lang: "javascript",
            meta: "line-numbers",
        };
        const expected =
            '<pre><code class="javascript" data-meta="line-numbers">console.log(\'Hello, world!\');</code></pre>';
        expect(codeBlock(input, profile)).toBe(expected);
    });

    test("should replace missing lang and meta with empty string", () => {
        profile.templates.codeBlock =
            '<pre><code class="$lang" data-meta="$meta">$value</code></pre>';
        const input: Code = {
            type: "code",
            value: "console.log('Hello, world!');",
        };
        const expected =
            '<pre><code class="" data-meta="">console.log(\'Hello, world!\');</code></pre>';
        expect(codeBlock(input, profile)).toBe(expected);
    });
});
