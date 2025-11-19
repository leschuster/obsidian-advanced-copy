/**
 * Gets a nested property from an object using a dot-notation path string.
 * @param path - Dot-notation path to the property (e.g., "frontmatter.enabled")
 * @param obj - The object to retrieve the property from
 * @returns The property value if found, undefined otherwise
 * @example
 * const settings = { frontmatter: { enabled: true } };
 * getNestedProperty("frontmatter.enabled", settings); // returns true
 */
function getNestedProperty(path: string, obj: any): any {
    const keys = path.split(".");
    let result = obj;

    for (const key of keys) {
        if (result === null || result === undefined) {
            return undefined;
        }
        result = result[key];
    }

    return result;
}
