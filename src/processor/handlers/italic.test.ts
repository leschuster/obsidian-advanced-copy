import { Emphasis, Text } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { italic } from "./italic";
import { CustomOptions } from "../toCustom";

describe("testing italic", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
        opts = { profile };
    });

    test("should return empty element when there are no children", () => {
        const input: Emphasis = {
            type: "emphasis",
            children: [],
        };
        const expected = "<em></em>";
        expect(italic(input, opts)).toBe(expected);
    });

    test("should return italic element with multiple children", () => {
        const input: Emphasis = {
            type: "emphasis",
            children: [
                {
                    type: "emphasis",
                    children: [
                        { type: "text", value: "Hello, World!" } satisfies Text,
                    ],
                } satisfies Emphasis,
                { type: "text", value: " Lorem ipsum!" } satisfies Text,
            ],
        };
        const expected = "<em><em>Hello, World!</em> Lorem ipsum!</em>";
        expect(italic(input, opts)).toBe(expected);
    });
});
