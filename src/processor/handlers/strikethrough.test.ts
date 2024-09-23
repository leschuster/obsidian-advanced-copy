import { Delete, Text } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { strikethrough } from "./strikethrough";
import { CustomOptions } from "../toCustom";

describe("testing strikethrough", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
        opts = { profile };
    });

    test("should return empty element when there are no children", () => {
        const input: Delete = {
            type: "delete",
            children: [],
        };
        const expected = "<del></del>";
        expect(strikethrough(input, opts)).toBe(expected);
    });

    test("should return strikethrough element with multiple children", () => {
        const input: Delete = {
            type: "delete",
            children: [
                { type: "text", value: "Hello, World! " } satisfies Text,
                { type: "text", value: "Lorem ipsum!" } satisfies Text,
            ],
        };
        const expected = "<del>Hello, World! Lorem ipsum!</del>";
        expect(strikethrough(input, opts)).toBe(expected);
    });
});
