import { countNodeTypes, getTemplate } from "./handlerUtils";
import { Nodes } from "mdast";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { CustomOptions } from "../toCustom";

describe("getTemplate", () => {
    it("should return the template string when profileTemplate is a string", () => {
        const profileTemplate = "template string";
        const opts: CustomOptions = {
            profile: DEFAULT_SETTINGS.profiles["markdown_to_html"],
        };

        const result = getTemplate(profileTemplate, opts);

        expect(result).toBe(profileTemplate);
    });

    it("should return 'template' if there are no additional options", () => {
        const profileTemplate = {
            template: "default",
            templateFirstChild: "first-child",
            templateLastChild: "last-child",
            templateFirstOfType: "first-of-type",
            templateLastOfType: "last-of-type",
        };
        const opts: CustomOptions = {
            profile: DEFAULT_SETTINGS.profiles["markdown_to_html"],
        };

        const result = getTemplate(profileTemplate, opts);

        expect(result).toBe(profileTemplate.template);
    });

    it("should return 'templateFirstChild' as first priority", () => {
        const profileTemplate = {
            template: "default",
            templateFirstChild: "first-child",
            templateLastChild: "last-child",
            templateFirstOfType: "first-of-type",
            templateLastOfType: "last-of-type",
        };
        const opts: CustomOptions = {
            profile: DEFAULT_SETTINGS.profiles["markdown_to_html"],
            isFirstChild: true,
            isLastChild: true,
            isFirstOfType: true,
            isLastOfType: true,
        };

        const result = getTemplate(profileTemplate, opts);

        expect(result).toBe(profileTemplate.templateFirstChild);
    });

    it("should return 'templateLastChild' as second priority", () => {
        const profileTemplate = {
            template: "default",
            templateFirstChild: "first-child",
            templateLastChild: "last-child",
            templateFirstOfType: "first-of-type",
            templateLastOfType: "last-of-type",
        };
        const opts: CustomOptions = {
            profile: DEFAULT_SETTINGS.profiles["markdown_to_html"],
            isFirstChild: false,
            isLastChild: true,
            isFirstOfType: true,
            isLastOfType: true,
        };
        const result = getTemplate(profileTemplate, opts);
        expect(result).toBe(profileTemplate.templateLastChild);
    });

    it("should return 'templateFirstOfType' as third priority", () => {
        const profileTemplate = {
            template: "default",
            templateFirstChild: "first-child",
            templateLastChild: "last-child",
            templateFirstOfType: "first-of-type",
            templateLastOfType: "last-of-type",
        };
        const opts: CustomOptions = {
            profile: DEFAULT_SETTINGS.profiles["markdown_to_html"],
            isFirstChild: false,
            isLastChild: false,
            isFirstOfType: true,
            isLastOfType: true,
        };

        const result = getTemplate(profileTemplate, opts);

        expect(result).toBe(profileTemplate.templateFirstOfType);
    });

    it("should return 'templateLastOfType' as last priority", () => {
        const profileTemplate = {
            template: "default",
            templateFirstChild: "first-child",
            templateLastChild: "last-child",
            templateFirstOfType: "first-of-type",
            templateLastOfType: "last-of-type",
        };
        const opts: CustomOptions = {
            profile: DEFAULT_SETTINGS.profiles["markdown_to_html"],
            isFirstChild: false,
            isLastChild: false,
            isFirstOfType: false,
            isLastOfType: true,
        };

        const result = getTemplate(profileTemplate, opts);

        expect(result).toBe(profileTemplate.templateLastOfType);
    });

    it("should return 'template' when no conditions are met", () => {
        const profileTemplate = {
            template: "default",
            templateFirstChild: "first-child",
            templateLastChild: "last-child",
            templateFirstOfType: "first-of-type",
            templateLastOfType: "last-of-type",
        };
        const opts: CustomOptions = {
            profile: DEFAULT_SETTINGS.profiles["markdown_to_html"],
            isFirstChild: false,
            isLastChild: false,
            isFirstOfType: false,
            isLastOfType: false,
        };

        const result = getTemplate(profileTemplate, opts);

        expect(result).toBe(profileTemplate.template);
    });

    it("should return default when there are no additional templates", () => {
        const profileTemplate = {
            template: "default",
        };
        const opts: CustomOptions = {
            profile: DEFAULT_SETTINGS.profiles["markdown_to_html"],
            isFirstChild: true,
            isLastChild: true,
            isFirstOfType: true,
            isLastOfType: true,
        };

        const result = getTemplate(profileTemplate, opts);

        expect(result).toBe(profileTemplate.template);
    });
});

describe("countNodeTypes", () => {
    it("should return an empty object when nodes is empty", () => {
        const nodes: Nodes[] = [];
        const result = countNodeTypes(nodes);
        expect(result).toEqual({});
    });

    it("should count the number of nodes of each type", () => {
        const nodes: Nodes[] = [
            { type: "paragraph", children: [] },
            { type: "code", value: "console.log('Hello, world!');" },
            { type: "paragraph", children: [] },
            { type: "heading", depth: 1, children: [] },
            { type: "heading", depth: 2, children: [] },
            { type: "list", ordered: false, children: [] },
            { type: "listItem", children: [] },
            { type: "blockquote", children: [] },
            { type: "paragraph", children: [] },
            { type: "code", value: "const x = 10;" },
            { type: "heading", depth: 1, children: [] },
            { type: "list", ordered: true, children: [] },
            { type: "listItem", children: [] },
            { type: "paragraph", children: [] },
        ];
        const result = countNodeTypes(nodes);
        expect(result).toEqual({
            paragraph: 4,
            code: 2,
            heading: 3,
            list: 2,
            listItem: 2,
            blockquote: 1,
        });
    });

    it("should not count nested nodes", () => {
        const nodes: Nodes[] = [
            {
                type: "paragraph",
                children: [
                    { type: "text", value: "Hello, " },
                    { type: "text", value: "world!" },
                ],
            },
        ];
        const result = countNodeTypes(nodes);
        expect(result).toEqual({ paragraph: 1 });
    });
});
