import { Profile } from "src/settings/settings";
import { CustomOptions } from "../toCustom";
import { mathInline } from "./math-inline";
import { InlineMath } from "mdast-util-math";

describe("testing mathInline", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = {
            templates: {
                mathInline: "\\($value\\)",
            },
        } as Profile;
        opts = { profile };
    });

    test("should return correct string for an inline math node with content", () => {
        const input: InlineMath = {
            type: "inlineMath",
            value: "E=mc^2",
        };
        const expected = "\\(E=mc^2\\)";
        expect(mathInline(input, opts)).toBe(expected);
    });

    test("should return correct string for an empty inline math node", () => {
        const input: InlineMath = {
            type: "inlineMath",
            value: "",
        };
        const expected = "\\(\\)";
        expect(mathInline(input, opts)).toBe(expected);
    });
});
