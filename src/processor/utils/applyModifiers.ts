import { modifiers } from "../modifiers";

/**
 * Apply all modifiers to the text.
 *
 * Modifiers are of the form `$modifier{value}`, where `modifier` is the name
 * of a function in the `modifiers` object and `value` is the argument to that function.
 *
 * @param text input text
 * @returns output text
 */
export function applyModifiers(text: string): string {
    return text.replace(/\$(\w+)\{([^}]+)\}/gm, (match, modifier, value) => {
        const modifierFunc = modifiers[modifier];
        if (modifierFunc) {
            try {
                return modifierFunc(value);
            } catch (_) {
                return match;
            }
        }
        return match;
    });
}
