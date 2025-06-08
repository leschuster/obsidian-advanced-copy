import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { CustomOptions } from "../toCustom";
import { modifyOptsBasedOnListIdx } from "./modifyOptsBasedOnListIdx";

describe("modifyOptsBasedOnListIdx", () => {
    it("should do not do anything when listLenght == 0", () => {
        const opts: CustomOptions = {
            profile: DEFAULT_SETTINGS.profiles["markdown_to_html"],
            topLevel: false,
            isFirstOfType: false,
            isLastOfType: false,
            isFirstChild: false,
            isLastChild: false,
        };

        const result = modifyOptsBasedOnListIdx(opts, 0, 0);

        expect(result).toBe(opts);
    });

    it("should set correct positions for list with one element", () => {
        const opts: CustomOptions = {
            profile: DEFAULT_SETTINGS.profiles["markdown_to_html"],
            topLevel: true,
            isFirstOfType: false,
            isLastOfType: false,
            isFirstChild: false,
            isLastChild: false,
        };

        const result = modifyOptsBasedOnListIdx(opts, 0, 1);

        expect(result).toEqual({
            ...opts,
            isFirstOfType: true,
            isLastOfType: true,
            isFirstChild: true,
            isLastChild: true,
            topLevel: false,
        });
    });

    it("should set correct positions for first element in a multi-element list", () => {
        const opts: CustomOptions = {
            profile: DEFAULT_SETTINGS.profiles["markdown_to_html"],
            topLevel: true,
            isFirstOfType: false,
            isLastOfType: false,
            isFirstChild: false,
            isLastChild: false,
        };

        const result = modifyOptsBasedOnListIdx(opts, 0, 3);

        expect(result).toEqual({
            ...opts,
            isFirstOfType: true,
            isLastOfType: false,
            isFirstChild: true,
            isLastChild: false,
            topLevel: false,
        });
    });

    it("should set correct positions for middle element in a multi-element list", () => {
        const opts: CustomOptions = {
            profile: DEFAULT_SETTINGS.profiles["markdown_to_html"],
            topLevel: true,
            isFirstOfType: false,
            isLastOfType: false,
            isFirstChild: false,
            isLastChild: false,
        };

        const result = modifyOptsBasedOnListIdx(opts, 1, 3);

        expect(result).toEqual({
            ...opts,
            isFirstOfType: false,
            isLastOfType: false,
            isFirstChild: false,
            isLastChild: false,
            topLevel: false,
        });
    });

    it("should set correct positions for last element in a multi-element list", () => {
        const opts: CustomOptions = {
            profile: DEFAULT_SETTINGS.profiles["markdown_to_html"],
            topLevel: true,
            isFirstOfType: false,
            isLastOfType: false,
            isFirstChild: false,
            isLastChild: false,
        };

        const result = modifyOptsBasedOnListIdx(opts, 2, 3);

        expect(result).toEqual({
            ...opts,
            isFirstOfType: false,
            isLastOfType: true,
            isFirstChild: false,
            isLastChild: true,
            topLevel: false,
        });
    });

    it("should handle edge case with negative index", () => {
        const opts: CustomOptions = {
            profile: DEFAULT_SETTINGS.profiles["markdown_to_html"],
            topLevel: true,
            isFirstOfType: false,
            isLastOfType: false,
            isFirstChild: false,
            isLastChild: false,
        };

        const result = modifyOptsBasedOnListIdx(opts, -1, 3);

        expect(result).toEqual(opts);
    });

    it("should handle edge case with index greater than list length", () => {
        const opts: CustomOptions = {
            profile: DEFAULT_SETTINGS.profiles["markdown_to_html"],
            topLevel: true,
            isFirstOfType: false,
            isLastOfType: false,
            isFirstChild: false,
            isLastChild: false,
        };

        const result = modifyOptsBasedOnListIdx(opts, 5, 3);

        expect(result).toEqual(opts);
    });
});
