import { Link, Text } from "mdast";
import { Profile } from "src/settings/settings";
import { link } from "./link";
import toCustom from "../toCustom";

jest.mock("../toCustom");

describe("testing link", () => {
    let profile: Profile;

    beforeEach(() => {
        profile = {
            templates: {
                link: '<a href="$url" title="$title">$alt</a>',
            },
        } as Profile;
    });

    test("should return correct string for a link node with URL, title, and alt text", () => {
        const input: Link = {
            type: "link",
            url: "https://example.com",
            title: "Example",
            children: [{ type: "text", value: "Click here" }] satisfies Text[],
        };

        (toCustom as jest.Mock).mockImplementation((node) => {
            if (node.type === "text") {
                return node.value;
            }
            return "";
        });

        const expected =
            '<a href="https://example.com" title="Example">Click here</a>';
        expect(link(input, profile)).toBe(expected);
    });

    test("should return correct string for a link node with URL and alt text but no title", () => {
        const input: Link = {
            type: "link",
            url: "https://example.com",
            title: null,
            children: [{ type: "text", value: "Click here" }] satisfies Text[],
        };

        (toCustom as jest.Mock).mockImplementation((node) => {
            if (node.type === "text") {
                return node.value;
            }
            return "";
        });

        const expected =
            '<a href="https://example.com" title="">Click here</a>';
        expect(link(input, profile)).toBe(expected);
    });

    test("should return correct string for a link node with URL and title but no alt text", () => {
        const input: Link = {
            type: "link",
            url: "https://example.com",
            title: "Example",
            children: [],
        };

        const expected = '<a href="https://example.com" title="Example"></a>';
        expect(link(input, profile)).toBe(expected);
    });

    test("should return correct string for a link node with only a URL", () => {
        const input: Link = {
            type: "link",
            url: "https://example.com",
            title: null,
            children: [],
        };

        const expected = '<a href="https://example.com" title=""></a>';
        expect(link(input, profile)).toBe(expected);
    });
});
