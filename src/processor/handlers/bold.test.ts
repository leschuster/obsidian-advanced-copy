import { Emphasis, Strong, Text } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Profile } from "src/settings/settings";
import { bold } from "./bold";

describe("testing bold", () => {
    let profile: Profile;

    beforeEach(() => {
        profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
    });

    test("should return empty element when there are no children", () => {
        const input: Strong = {
            type: "strong",
            children: [],
        };
        const expected = "<strong></strong>";
        expect(bold(input, profile)).toBe(expected);
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
        expect(bold(input, profile)).toBe(expected);
    });
});
