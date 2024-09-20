import { List, ListItem, Paragraph } from "mdast";
import { Profile } from "src/settings/settings";
import { list } from "./list";

jest.mock("../toCustom");

describe("testing list", () => {
    let profile: Profile;

    beforeEach(() => {
        profile = {
            templates: {
                orderedList: '<ol start="$start">$value</ol>',
                unorderedList: "<ul>$value</ul>",
                listItemOrdered: "<li ordered>$value</li>",
                listItemUnordered: "<li unordered>$value</li>",
            },
        } as Profile;
    });

    test("should return correct string for an ordered list with multiple items", () => {
        const input: List = {
            type: "list",
            ordered: true,
            children: [
                {
                    type: "listItem",
                    children: [
                        {
                            type: "paragraph",
                            children: [],
                        } satisfies Paragraph,
                    ],
                } satisfies ListItem,
                {
                    type: "listItem",
                    children: [
                        {
                            type: "paragraph",
                            children: [],
                        } satisfies Paragraph,
                    ],
                } satisfies ListItem,
            ],
        };

        const expected =
            '<ol start="1"><li ordered><mock-paragraph>...</mock-paragraph></li><li ordered><mock-paragraph>...</mock-paragraph></li></ol>';
        expect(list(input, profile)).toBe(expected);
    });

    test("should return correct string for an unordered list with multiple items", () => {
        const input: List = {
            type: "list",
            ordered: false,
            children: [
                {
                    type: "listItem",
                    children: [
                        {
                            type: "paragraph",
                            children: [],
                        } satisfies Paragraph,
                    ],
                } satisfies ListItem,
                {
                    type: "listItem",
                    children: [
                        {
                            type: "paragraph",
                            children: [],
                        } satisfies Paragraph,
                    ],
                } satisfies ListItem,
            ],
        };

        const expected =
            "<ul><li unordered><mock-paragraph>...</mock-paragraph></li><li unordered><mock-paragraph>...</mock-paragraph></li></ul>";
        expect(list(input, profile)).toBe(expected);
    });

    test("should handle an empty ordered list", () => {
        const input: List = {
            type: "list",
            ordered: true,
            start: 1,
            children: [],
        };

        const expected = '<ol start="1"></ol>';
        expect(list(input, profile)).toBe(expected);
    });

    test("should handle an ordered list with start property", () => {
        const input: List = {
            type: "list",
            ordered: true,
            start: 200,
            children: [],
        };

        const expected = '<ol start="200"></ol>';
        expect(list(input, profile)).toBe(expected);
    });

    test("should handle an empty unordered list", () => {
        const input: List = {
            type: "list",
            ordered: false,
            children: [],
        };

        const expected = "<ul></ul>";
        expect(list(input, profile)).toBe(expected);
    });
});
