import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Callout } from "../remark-plugins/remark-callout";
import { callout } from "./callout";
import { Emphasis, Paragraph, Text } from "mdast";
import { CustomOptions } from "../toCustom";

describe("testing callout", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
        opts = { profile };
    });

    test("should return empty callout", () => {
        const input: Callout = {
            type: "callout",
            calloutType: "info",
            calloutBehavior: "",
            closeable: false,
            default_open: true,
            title: [],
            children: [],
        };
        const expected =
            '<div class="callout callout-info callout-closeable-false callout-default-open-true">\n<h2></h2>\n<div></div>\n</div>\n\n';
        expect(callout(input, opts)).toBe(expected);
    });

    test("should insert title", () => {
        const input: Callout = {
            type: "callout",
            calloutType: "info",
            calloutBehavior: "",
            closeable: false,
            default_open: true,
            title: [
                {
                    type: "text",
                    value: "test ",
                } satisfies Text,
                {
                    type: "emphasis",
                    children: [
                        {
                            type: "text",
                            value: "emphasis",
                        } satisfies Text,
                    ],
                } satisfies Emphasis,
            ],
            children: [],
        };
        const expected =
            '<div class="callout callout-info callout-closeable-false callout-default-open-true">\n<h2>test <em>emphasis</em></h2>\n<div></div>\n</div>\n\n';
        expect(callout(input, opts)).toBe(expected);
    });

    test("should insert content", () => {
        const input: Callout = {
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
                            value: "Hello",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "World",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
            ],
        };
        const expected =
            '<div class="callout callout-info callout-closeable-false callout-default-open-true">\n<h2></h2>\n<div>HelloWorld</div>\n</div>\n\n';
        expect(callout(input, opts)).toBe(expected);
    });

    test("should insert content with template", () => {
        const input: Callout = {
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
                            value: "Hello",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
                {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            value: "World",
                        } satisfies Text,
                    ],
                } satisfies Paragraph,
            ],
        };
        opts.profile.templates.calloutContentLine = "<line>$value</line>";
        const expected =
            '<div class="callout callout-info callout-closeable-false callout-default-open-true">\n<h2></h2>\n<div><line>Hello</line><line>World</line></div>\n</div>\n\n';
        expect(callout(input, opts)).toBe(expected);
    });

    test("should insert type", () => {
        const input: Callout = {
            type: "callout",
            calloutType: "danger",
            calloutBehavior: "",
            closeable: false,
            default_open: true,
            title: [],
            children: [],
        };
        const expected =
            '<div class="callout callout-danger callout-closeable-false callout-default-open-true">\n<h2></h2>\n<div></div>\n</div>\n\n';
        expect(callout(input, opts)).toBe(expected);
    });

    test("should insert closeable", () => {
        const input: Callout = {
            type: "callout",
            calloutType: "info",
            calloutBehavior: "+",
            closeable: true,
            default_open: true,
            title: [],
            children: [],
        };
        const expected =
            '<div class="callout callout-info callout-closeable-true callout-default-open-true">\n<h2></h2>\n<div></div>\n</div>\n\n';
        expect(callout(input, opts)).toBe(expected);
    });

    test("should insert default-open", () => {
        const input: Callout = {
            type: "callout",
            calloutType: "info",
            calloutBehavior: "",
            closeable: false,
            default_open: false,
            title: [],
            children: [],
        };
        const expected =
            '<div class="callout callout-info callout-closeable-false callout-default-open-false">\n<h2></h2>\n<div></div>\n</div>\n\n';
        expect(callout(input, opts)).toBe(expected);
    });

    test("should insert behavior", () => {
        const input: Callout = {
            type: "callout",
            calloutType: "info",
            calloutBehavior: "-",
            closeable: true,
            default_open: false,
            title: [],
            children: [],
        };
        opts.profile.templates.callout =
            '<div class="callout callout-$behavior"><h2>$title</h2><div>$content</div></div>';
        const expected =
            '<div class="callout callout--"><h2></h2><div></div></div>';
        expect(callout(input, opts)).toBe(expected);
    });
});
