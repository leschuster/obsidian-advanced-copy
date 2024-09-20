import { Link, Text } from "mdast";
import { Profile } from "src/settings/settings";
import { link } from "./link";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";

describe("testing link", () => {
    let profile: Profile;

    beforeEach(() => {
        profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
    });

    test("should return correct string for a link node with URL, title, and alt text", () => {
        profile.templates.link = '<a href="$src" title="$title">$alt</a>';
        const input: Link = {
            type: "link",
            url: "https://example.com",
            title: "Example",
            children: [{ type: "text", value: "Click here" }] satisfies Text[],
        };

        const expected =
            '<a href="https://example.com" title="Example">Click here</a>';
        expect(link(input, profile)).toBe(expected);
    });

    test("should return correct string for a link node with URL and alt text", () => {
        const input: Link = {
            type: "link",
            url: "https://example.com",
            title: null,
            children: [{ type: "text", value: "Click here" }] satisfies Text[],
        };

        const expected = '<a href="https://example.com">Click here</a>';
        expect(link(input, profile)).toBe(expected);
    });

    test("should return correct string for a link node with only a URL", () => {
        const input: Link = {
            type: "link",
            url: "https://example.com",
            title: null,
            children: [],
        };

        const expected = '<a href="https://example.com"></a>';
        expect(link(input, profile)).toBe(expected);
    });
});
