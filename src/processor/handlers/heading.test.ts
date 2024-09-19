import { Heading, Text } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Profile } from "src/settings/settings";
import { heading } from "./heading";
import toCustom from "../toCustom";

jest.mock("../toCustom");

jest.mock("../../utils/Logger", () => {
    return jest.fn().mockImplementation(() => {
        return { error: console.error };
    });
});

describe("testing heading", () => {
    let profile: Profile;

    beforeEach(() => {
        profile = DEFAULT_SETTINGS.profiles["markdown_to_html"];
        profile.templates.heading1 = "<h1>$value</h1>";
        profile.templates.heading2 = "<h2>$value</h2>";
        profile.templates.heading3 = "<h3>$value</h3>";
        profile.templates.heading4 = "<h4>$value</h4>";
        profile.templates.heading5 = "<h5>$value</h5>";
        profile.templates.heading6 = "<h6>$value</h6>";
    });

    test("should return heading with depth 1", () => {
        const input: Heading = {
            type: "heading",
            depth: 1,
            children: [{ type: "text", value: "Hello" }] satisfies Text[],
        };

        (toCustom as jest.Mock).mockImplementation((node) => {
            if (node.type === "text") {
                return node.value;
            }
            return "";
        });

        const expected = "<h1>Hello</h1>";
        expect(heading(input, profile)).toBe(expected);
    });

    test("should return heading with depth 6", () => {
        const input: Heading = {
            type: "heading",
            depth: 6,
            children: [{ type: "text", value: "Hello" }] satisfies Text[],
        };

        (toCustom as jest.Mock).mockImplementation((node) => {
            if (node.type === "text") {
                return node.value;
            }
            return "";
        });

        const expected = "<h6>Hello</h6>";
        expect(heading(input, profile)).toBe(expected);
    });

    test("should process child nodes correctly", () => {
        const input: Heading = {
            type: "heading",
            depth: 2,
            children: [
                { type: "text", value: "Hello" } satisfies Text,
                { type: "text", value: "World" } satisfies Text,
            ],
        };

        (toCustom as jest.Mock).mockImplementation((node) => {
            if (node.type === "text") {
                return node.value;
            }
            return "";
        });

        const expected = "<h2>HelloWorld</h2>";
        expect(heading(input, profile)).toBe(expected);
    });
});
