import { modifiers } from "../modifiers";
import { applyModifiers } from "./applyModifiers";

describe("testing applyModifiers", () => {
    test("should return the same string when no modifier is found", () => {
        const input = "Lorem ipsum";
        const expected = "Lorem ipsum";

        expect(applyModifiers(input)).toBe(expected);
    });

    test("should return the same string when an invalid modifier is found", () => {
        const input = "Hello $invalid{world}";
        const expected = "Hello $invalid{world}";

        expect(applyModifiers(input)).toBe(expected);
    });

    test("should apply a single 'upper' modifier correctly", () => {
        const input = "Hello $upper{world}";
        const expected = "Hello WORLD";

        expect(applyModifiers(input)).toBe(expected);
    });

    test("should apply a single 'lower' modifier correctly", () => {
        const input = "Hello $lower{WORLD}";
        const expected = "Hello world";

        expect(applyModifiers(input)).toBe(expected);
    });

    test("should apply a single 'capitalize' modifier correctly", () => {
        const input = "hello $capitalize{world}";
        const expected = "hello World";

        expect(applyModifiers(input)).toBe(expected);
    });

    test("should apply a single 'reverse' modifier correctly", () => {
        const input = "Hello $reverse{world}";
        const expected = "Hello dlrow";

        expect(applyModifiers(input)).toBe(expected);
    });

    test("should apply a single 'blank' modifier correctly", () => {
        const input = "Hello $blank{world}";
        const expected = "Hello ";

        expect(applyModifiers(input)).toBe(expected);
    });

    test("should apply a single 'replace' modifier correctly", () => {
        const input = "Hello $replace{world,o,0}";
        const expected = "Hello w0rld";

        expect(applyModifiers(input)).toBe(expected);
    });

    test("should return the original string if the 'replace' modifier has invalid arguments", () => {
        const input = "Hello $replace{world,o}";
        const expected = "Hello $replace{world,o}";

        expect(applyModifiers(input)).toBe(expected);
    });

    test("should apply multiple modifiers in series correctly", () => {
        const input =
            "Hello $upper{world} $lower{WORLD} $capitalize{world} $reverse{world}";
        const expected = "Hello WORLD world World dlrow";

        expect(applyModifiers(input)).toBe(expected);
    });

    test("should not apply nested modifiers", () => {
        const input = "Hello $upper{$lower{world}}";
        const expected = "Hello $LOWER{WORLD}";

        expect(applyModifiers(input)).toBe(expected);
    });

    test("should not apply empty 'upper' modifier", () => {
        const input = "Hello $upper{}"; // not covered by the regex
        const expected = "Hello $upper{}";

        expect(applyModifiers(input)).toBe(expected);
    });

    test("should apply same modifier multiple times", () => {
        const input = "$upper{hello} $upper{world}";
        const expected = "HELLO WORLD";

        expect(applyModifiers(input)).toBe(expected);
    });
});
