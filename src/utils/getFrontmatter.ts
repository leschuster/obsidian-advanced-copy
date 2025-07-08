import { App, TFile } from "obsidian";

export type Frontmatter = Record<string, string>;

/**
 * Returns the frontmatter of the given file as an object with string values.
 * Primitive datatypes are converted to string, arrays of strings are concatenated.
 * Everything else is ignored.
 *
 * @param app
 * @param file
 * @returns Frontmatter of file as object
 */
export function getFrontmatter(app: App, file: TFile): Frontmatter {
    const raw = app.metadataCache.getFileCache(file)?.frontmatter ?? {};
    const result: Frontmatter = {};

    for (const [key, value] of Object.entries(raw)) {
        if (
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
        ) {
            result[key] = String(value);
        }

        if (
            Array.isArray(value) &&
            value.every((item) => typeof item === "string")
        ) {
            result[key] = value.join(", ");
        }
    }

    return result;
}
