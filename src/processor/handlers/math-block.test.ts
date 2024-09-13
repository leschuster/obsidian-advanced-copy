import { Profile } from "src/settings/settings";
import { mathBlock } from "./math-block";
import { Math as MathNode } from "mdast-util-math/lib";

describe("testing mathBlock", () => {
	let profile: Profile;

	beforeEach(() => {
		profile = {
			templates: {
				mathBlock: "\\[$value\\]",
			},
		} as Profile;
	});

	test("should return correct string for a math block node with content", () => {
		const input: MathNode = {
			type: "math",
			value: "\\frac{a}{b}",
		};
		const expected = "\\[\\frac{a}{b}\\]";
		expect(mathBlock(input, profile)).toBe(expected);
	});

	test("should return correct string for an empty math block node", () => {
		const input: MathNode = {
			type: "math",
			value: "",
		};
		const expected = "\\[\\]";
		expect(mathBlock(input, profile)).toBe(expected);
	});

	test("should replace meta", () => {
		profile.templates.mathBlock =
			'<div data-meta="$meta">\\[$value\\]</div>';
		const input: MathNode = {
			type: "math",
			value: "\\frac{a}{b}",
			meta: "some information",
		};
		const expected =
			'<div data-meta="some information">\\[\\frac{a}{b}\\]</div>';
		expect(mathBlock(input, profile)).toBe(expected);
	});
});
