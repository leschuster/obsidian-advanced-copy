import { CustomOptions } from "../toCustom";

/**
 * Set positional flags in opts based on the index in a list.
 *
 * @param opts original opts
 * @param idx index in list
 * @param listLength total length of list
 * @returns new opts
 */
export function modifyOptsBasedOnListIdx(
    opts: CustomOptions,
    idx: number,
    listLength: number,
): CustomOptions {
    if (listLength === 0 || idx < 0 || idx >= listLength) {
        return opts;
    }

    const isFirstChild = idx === 0;
    const isLastChild = idx === listLength - 1;
    const isFirstOfType = isFirstChild;
    const isLastOfType = isLastChild;

    return {
        ...opts,
        isFirstOfType,
        isLastOfType,
        isFirstChild,
        isLastChild,
        topLevel: false,
    };
}
