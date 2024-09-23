import { wikilink } from "./wikilink";
import { Wikilink } from "../remark-plugins/wikilink";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { CustomOptions } from "../toCustom";

describe("testing wikilink", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
        profile.templates.embeddedWikilink =
            '<a class="embedded" href="obsidian://open?vault=$vaultName&file=$link">$text</a>';
        profile.templates.wikilink =
            '<a href="obsidian://open?vault=$vaultName&file=$link">$text</a>';
        opts = { profile };
    });

    test("should convert a normal wikilink to string", () => {
        const input: Wikilink = {
            type: "wikilink",
            value: "Lorem ipsum",
            link: "test_file",
            embedded: false,
        };
        const expected =
            '<a href="obsidian://open?vault=$vaultName&file=test_file">Lorem ipsum</a>';

        expect(wikilink(input, opts)).toBe(expected);
    });

    test("should convert an embedded wikilink to string", () => {
        const input: Wikilink = {
            type: "wikilink",
            value: "Lorem ipsum",
            link: "test_file",
            embedded: true,
        };
        const expected =
            '<a class="embedded" href="obsidian://open?vault=$vaultName&file=test_file">Lorem ipsum</a>';

        expect(wikilink(input, opts)).toBe(expected);
    });

    test("should use link as value when value is empty", () => {
        const input: Wikilink = {
            type: "wikilink",
            value: "",
            link: "test_file",
            embedded: false,
        };
        const expected =
            '<a href="obsidian://open?vault=$vaultName&file=test_file">test_file</a>';

        expect(wikilink(input, opts)).toBe(expected);
    });

    test("should use link as value when value is empty (embedded)", () => {
        const input: Wikilink = {
            type: "wikilink",
            value: "",
            link: "test_file",
            embedded: true,
        };
        const expected =
            '<a class="embedded" href="obsidian://open?vault=$vaultName&file=test_file">test_file</a>';

        expect(wikilink(input, opts)).toBe(expected);
    });

    test("should handle wikilink with special characters in link", () => {
        const input: Wikilink = {
            type: "wikilink",
            value: "Lorem ipsum",
            link: "test_file#section",
            embedded: false,
        };
        const expected =
            '<a href="obsidian://open?vault=$vaultName&file=test_file#section">Lorem ipsum</a>';

        expect(wikilink(input, opts)).toBe(expected);
    });

    test("should handle embedded wikilink with special characters in link", () => {
        const input: Wikilink = {
            type: "wikilink",
            value: "Lorem ipsum",
            link: "test_file#section",
            embedded: true,
        };
        const expected =
            '<a class="embedded" href="obsidian://open?vault=$vaultName&file=test_file#section">Lorem ipsum</a>';

        expect(wikilink(input, opts)).toBe(expected);
    });
});
