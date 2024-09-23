import { ThematicBreak } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { horizontalRule } from "./horizontal-rule";
import { CustomOptions } from "../toCustom";

describe("testing horizontalRule", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
        opts = { profile };
    });

    test("should return horizontal rule element", () => {
        const input: ThematicBreak = {
            type: "thematicBreak",
        };
        const expected = "<hr />";
        expect(horizontalRule(input, opts)).toBe(expected);
    });
});
