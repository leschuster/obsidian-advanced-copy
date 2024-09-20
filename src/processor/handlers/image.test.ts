import { Image } from "mdast";
import { Profile } from "src/settings/settings";
import { image } from "./image";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";

describe("testing image", () => {
    let profile: Profile;

    beforeEach(() => {
        profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
    });

    test("should return correct string for an image node with only a URL", () => {
        const input: Image = {
            type: "image",
            url: "https://example.com/image.png",
            title: null,
            alt: null,
        };
        const expected = '<img src="https://example.com/image.png" alt="" />';
        expect(image(input, profile)).toBe(expected);
    });

    test("should return correct string for an image node with a URL and title", () => {
        profile.templates.image =
            '<img src="$src" title="$title" alt="$alt" />';
        const input: Image = {
            type: "image",
            url: "https://example.com/image.png",
            title: "Example Image",
            alt: null,
        };
        const expected =
            '<img src="https://example.com/image.png" title="Example Image" alt="" />';
        expect(image(input, profile)).toBe(expected);
    });

    test("should return correct string for an image node with a URL and alt text", () => {
        const input: Image = {
            type: "image",
            url: "https://example.com/image.png",
            title: null,
            alt: "An example image",
        };
        const expected =
            '<img src="https://example.com/image.png" alt="An example image" />';
        expect(image(input, profile)).toBe(expected);
    });
});
