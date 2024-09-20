import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Profile } from "src/settings/settings";
import { Callout } from "../remark-plugins/remark-callout";
import { callout } from "./callout";
import { Emphasis, Paragraph, Text } from "mdast";

jest.mock("../toCustom");

describe("testing callout", () => {
    let profile: Profile;

    beforeEach(() => {
        profile = DEFAULT_SETTINGS.profiles["markdown_to_html"];
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
            '<div class="callout callout-info callout-closeable-false callout-default-open-true"><h2></h2><div></div></div>';
        expect(callout(input, profile)).toBe(expected);
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
                    value: "test",
                } satisfies Text,
                {
                    type: "emphasis",
                    children: [],
                } satisfies Emphasis,
            ],
            children: [],
        };
        const expected =
            '<div class="callout callout-info callout-closeable-false callout-default-open-true"><h2><mock-text>...</mock-text><mock-emphasis>...</mock-emphasis></h2><div></div></div>';
        expect(callout(input, profile)).toBe(expected);
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
                    children: [],
                } satisfies Paragraph,
                {
                    type: "paragraph",
                    children: [],
                } satisfies Paragraph,
            ],
        };
        const expected =
            '<div class="callout callout-info callout-closeable-false callout-default-open-true"><h2></h2><div><mock-paragraph>...</mock-paragraph><mock-paragraph>...</mock-paragraph></div></div>';
        expect(callout(input, profile)).toBe(expected);
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
                    children: [],
                } satisfies Paragraph,
                {
                    type: "paragraph",
                    children: [],
                } satisfies Paragraph,
            ],
        };
        profile.templates.calloutContentLine = "<line>$value</line>";
        const expected =
            '<div class="callout callout-info callout-closeable-false callout-default-open-true"><h2></h2><div><line><mock-paragraph>...</mock-paragraph></line><line><mock-paragraph>...</mock-paragraph></line></div></div>';
        expect(callout(input, profile)).toBe(expected);
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
            '<div class="callout callout-danger callout-closeable-false callout-default-open-true"><h2></h2><div></div></div>';
        expect(callout(input, profile)).toBe(expected);
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
            '<div class="callout callout-info callout-closeable-true callout-default-open-true"><h2></h2><div></div></div>';
        expect(callout(input, profile)).toBe(expected);
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
            '<div class="callout callout-info callout-closeable-false callout-default-open-false"><h2></h2><div></div></div>';
        expect(callout(input, profile)).toBe(expected);
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
        profile.templates.callout =
            '<div class="callout callout-$behavior"><h2>$title</h2><div>$content</div></div>';
        const expected =
            '<div class="callout callout--"><h2></h2><div></div></div>';
        expect(callout(input, profile)).toBe(expected);
    });
});
