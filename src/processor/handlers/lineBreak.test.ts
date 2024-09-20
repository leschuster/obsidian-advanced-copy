import { Break } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Profile } from "src/settings/settings";
import { lineBreak } from "./lineBreak";

describe("testing lineBreak", () => {
    let profile: Profile;

    beforeEach(() => {
        profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
    });

    test("should return break element", () => {
        const input: Break = {
            type: "break",
        };
        const expected = "<br />";
        expect(lineBreak(input, profile)).toBe(expected);
    });
});
