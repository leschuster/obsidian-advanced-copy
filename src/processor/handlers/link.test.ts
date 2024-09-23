import { Link, Text } from "mdast";
import { link } from "./link";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { CustomOptions } from "../toCustom";

describe("testing link", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
        opts = { profile };
    });

    test("should return correct string for a link node with URL, title, and alt text", () => {
        opts.profile.templates.link = '<a href="$src" title="$title">$alt</a>';
        const input: Link = {
            type: "link",
            url: "https://example.com",
            title: "Example",
            children: [{ type: "text", value: "Click here" }] satisfies Text[],
        };

        const expected =
            '<a href="https://example.com" title="Example">Click here</a>';
        expect(link(input, opts)).toBe(expected);
    });

    test("should return correct string for a link node with URL and alt text", () => {
        const input: Link = {
            type: "link",
            url: "https://example.com",
            title: null,
            children: [{ type: "text", value: "Click here" }] satisfies Text[],
        };

        const expected = '<a href="https://example.com">Click here</a>';
        expect(link(input, opts)).toBe(expected);
    });

    test("should return correct string for a link node with only a URL", () => {
        const input: Link = {
            type: "link",
            url: "https://example.com",
            title: null,
            children: [],
        };

        const expected = '<a href="https://example.com"></a>';
        expect(link(input, opts)).toBe(expected);
    });
});
