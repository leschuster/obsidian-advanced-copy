import { Image } from "mdast";
import { Profile } from "src/settings/settings";
import { image } from "./image";

describe("testing image", () => {
    let profile: Profile;

    beforeEach(() => {
        profile = {
            templates: {
                image: '<img src="$url" title="$title" alt="$alt" />',
            },
        } as Profile;
    });

    test("should return correct string for an image node with only a URL", () => {
        const input: Image = {
            type: "image",
            url: "https://example.com/image.png",
            title: null,
            alt: null,
        };
        const expected =
            '<img src="https://example.com/image.png" title="" alt="" />';
        expect(image(input, profile)).toBe(expected);
    });

    test("should return correct string for an image node with a URL and title", () => {
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
            '<img src="https://example.com/image.png" title="" alt="An example image" />';
        expect(image(input, profile)).toBe(expected);
    });

    test("should return correct string for an image node with a URL, title, and alt text", () => {
        const input: Image = {
            type: "image",
            url: "https://example.com/image.png",
            title: "Example Image",
            alt: "An example image",
        };
        const expected =
            '<img src="https://example.com/image.png" title="Example Image" alt="An example image" />';
        expect(image(input, profile)).toBe(expected);
    });
});
