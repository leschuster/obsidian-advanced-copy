import { Break } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { lineBreak } from "./lineBreak";
import { CustomOptions } from "../toCustom";

describe("testing lineBreak", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
        opts = { profile };
    });

    test("should return break element", () => {
        const input: Break = {
            type: "break",
        };
        const expected = "<br />";
        expect(lineBreak(input, opts)).toBe(expected);
    });
});
