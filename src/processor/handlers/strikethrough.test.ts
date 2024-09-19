import { Delete, Text } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Profile } from "src/settings/settings";
import { strikethrough } from "./strikethrough";

jest.mock("../toCustom");

describe("testing strikethrough", () => {
    let profile: Profile;

    beforeEach(() => {
        profile = DEFAULT_SETTINGS.profiles["markdown_to_html"];
        profile.templates.strikethrough = "<del>$value</del>";
    });

    test("should return empty element when there are no children", () => {
        const input: Delete = {
            type: "delete",
            children: [],
        };
        const expected = "<del></del>";
        expect(strikethrough(input, profile)).toBe(expected);
    });

    test("should return strikethrough element with multiple children", () => {
        const input: Delete = {
            type: "delete",
            children: [
                { type: "text", value: "" } satisfies Text,
                { type: "text", value: "" } satisfies Text,
            ],
        };
        const expected =
            "<del><mock-text>...</mock-text><mock-text>...</mock-text></del>";
        expect(strikethrough(input, profile)).toBe(expected);
    });
});
