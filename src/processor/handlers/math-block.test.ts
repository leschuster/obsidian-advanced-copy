import { Profile } from "src/settings/settings";
import { mathBlock } from "./math-block";
import { Math as MathNode } from "mdast-util-math/lib";
import { CustomOptions } from "../toCustom";

describe("testing mathBlock", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = {
            templates: {
                mathBlock: "\\[$value\\]",
            },
        } as Profile;
        opts = { profile };
    });

    test("should return correct string for a math block node with content", () => {
        const input: MathNode = {
            type: "math",
            value: "\\frac{a}{b}",
        };
        const expected = "\\[\\frac{a}{b}\\]";
        expect(mathBlock(input, opts)).toBe(expected);
    });

    test("should return correct string for an empty math block node", () => {
        const input: MathNode = {
            type: "math",
            value: "",
        };
        const expected = "\\[\\]";
        expect(mathBlock(input, opts)).toBe(expected);
    });

    test("should replace meta", () => {
        opts.profile.templates.mathBlock =
            '<div data-meta="$meta">\\[$value\\]</div>';
        const input: MathNode = {
            type: "math",
            value: "\\frac{a}{b}",
            meta: "some information",
        };
        const expected =
            '<div data-meta="some information">\\[\\frac{a}{b}\\]</div>';
        expect(mathBlock(input, opts)).toBe(expected);
    });
});
