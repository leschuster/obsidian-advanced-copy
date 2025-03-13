export type ModifierFunc = (...args: string[]) => string;

/**
 * Modifiers are a way to transform text in a custom way.
 * They can be used in templates to modify the output of a handler.
 */
export const modifiers: Record<string, ModifierFunc> = {
    upper: (text: string) => text.toUpperCase(),
    lower: (text: string) => text.toLowerCase(),
    capitalize: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
    reverse: (text: string) => text.split("").reverse().join(""),
    blank: (_) => "",
    replace: (text: string, from: string, to: string) =>
        text.split(from).join(to),
};
