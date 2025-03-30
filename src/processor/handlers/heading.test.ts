import { Heading, Text } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { heading } from "./heading";
import { jest } from "@jest/globals";
import { CustomOptions } from "../toCustom";

jest.mock("../../utils/Logger", () => {
    return jest.fn().mockImplementation(() => {
        return { error: console.error };
    });
});

describe("testing heading", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
        opts = { profile };
    });

    test("should return heading with depth 1", () => {
        const input: Heading = {
            type: "heading",
            depth: 1,
            children: [{ type: "text", value: "Hello" }] satisfies Text[],
        };

        const expected = "<h1>Hello</h1>\n\n";
        expect(heading(input, opts)).toBe(expected);
    });

    test("should return heading with depth 6", () => {
        const input: Heading = {
            type: "heading",
            depth: 6,
            children: [{ type: "text", value: "Hello" }] satisfies Text[],
        };

        const expected = "<h6>Hello</h6>\n\n";
        expect(heading(input, opts)).toBe(expected);
    });

    test("should process child nodes correctly", () => {
        const input: Heading = {
            type: "heading",
            depth: 2,
            children: [
                { type: "text", value: "Hello " } satisfies Text,
                { type: "text", value: "World" } satisfies Text,
            ],
        };

        const expected = "<h2>Hello World</h2>\n\n";
        expect(heading(input, opts)).toBe(expected);
    });
});
