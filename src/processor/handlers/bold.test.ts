import { Emphasis, Strong, Text } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { bold } from "./bold";
import { CustomOptions } from "../toCustom";

describe("testing bold", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
        opts = { profile };
    });

    test("should return empty element when there are no children", () => {
        const input: Strong = {
            type: "strong",
            children: [],
        };
        const expected = "<strong></strong>";
        expect(bold(input, opts)).toBe(expected);
    });

    test("should return bold element with multiple children", () => {
        const input: Strong = {
            type: "strong",
            children: [
                {
                    type: "emphasis",
                    children: [
                        { type: "text", value: "Hello, World!" } satisfies Text,
                    ],
                } satisfies Emphasis,
                { type: "text", value: "Lorem ipsum!" } satisfies Text,
            ],
        };
        const expected = "<strong><em>Hello, World!</em>Lorem ipsum!</strong>";
        expect(bold(input, opts)).toBe(expected);
    });
});
