/**
 * Advanced Copy Plugin Settings
 */
export type AdvancedCopyPluginSettings = {
    profiles: { [key: string]: Profile };
};

/**
 * A profile holds the configuration to convert a markdown AST to a string
 * using user-defined templates.
 */
export type Profile = {
    meta: {
        id: string;
        name: string;
        description: string;
        cmdSelection: boolean;
        cmdPage: boolean;
        replaceGemojiShortcodes: boolean;
        configVersion: number;
    };
    templates: {
        blockquoteLine: string;
        blockquoteWrapper: string;
        bold: string;
        callout: string;
        calloutContentLine: string;
        codeBlock: string;
        codeInline: string;
        embeddedWikilink: string;
        heading1: string;
        heading2: string;
        heading3: string;
        heading4: string;
        heading5: string;
        heading6: string;
        horizontalRule: string;
        image: string;
        italic: string;
        lineBreak: string;
        link: string;
        listItemOrdered: string;
        listItemUnordered: string;
        mathBlock: string;
        mathInline: string;
        orderedList: string;
        paragraph: string;
        paragraphNested: string;
        strikethrough: string;
        text: string;
        unorderedList: string;
        wikilink: string;
    };
    extra: {
        before: string;
        after: string;
    };
};

/**
 * A description of a single property in a profile
 */
export type ProfileDescProperty = {
    name: string;
    desc: string;
    type: "string" | "boolean" | "number";
    vars?: { name: string; desc: string }[];
    visible?: boolean;
};

/**
 * A description of all properties in a profile
 */
export const profileDesc: {
    meta: Record<string, ProfileDescProperty>;
    templates: Record<string, ProfileDescProperty>;
    extra: Record<string, ProfileDescProperty>;
} = {
    meta: {
        id: {
            name: "ID",
            desc: "Unique identifier for the profile",
            type: "string",
            visible: false,
        },
        name: {
            name: "Name",
            desc: "Name of the profile",
            type: "string",
        },
        description: {
            name: "Description",
            desc: "Description of the profile",
            type: "string",
        },
        cmdSelection: {
            name: "Command: Copy Selection",
            desc: "Add a command to copy the current selection",
            type: "boolean",
        },
        cmdPage: {
            name: "Command: Copy Page",
            desc: "Add a command to copy the entire page",
            type: "boolean",
        },
        replaceGemojiShortcodes: {
            name: "Replace Gemoji Shortcodes",
            desc: "Replace Gemoji shortcodes with their unicode equivalent",
            type: "boolean",
        },
        configVersion: {
            name: "Configuration Version",
            desc: "Version of the profile configuration",
            type: "number",
            visible: false,
        },
    },
    templates: {
        blockquoteLine: {
            name: "Blockquote Line",
            desc: "Template for a single blockquote line",
            vars: [{ name: "$value", desc: "Blockquote line content" }],
            type: "string",
        },
        blockquoteWrapper: {
            name: "Blockquote Wrapper",
            desc: "Template for a blockquote. Contains all blockquote lines.",
            vars: [{ name: "$content", desc: "Blockquote lines" }],
            type: "string",
        },
        bold: {
            name: "Bold",
            desc: "Template for bold text",
            vars: [{ name: "$value", desc: "Bold text content" }],
            type: "string",
        },
        callout: {
            name: "Callout",
            desc: "Template for a callout",
            vars: [
                { name: "$type", desc: "Callout type, e.g. 'info'" },
                { name: "$behavior", desc: "either '+', '-', or ''" },
                { name: "$content", desc: "Callout content lines" },
                { name: "$title", desc: "Callout title" },
                {
                    name: "$closeable",
                    desc: "boolean, whether it can be closed or not",
                },
                {
                    name: "$default_open",
                    desc: "boolean, whether it is open by defual",
                },
            ],
            type: "string",
        },
        calloutContentLine: {
            name: "Callout Content Line",
            desc: "Template for a single callout content line",
            vars: [{ name: "$value", desc: "Callout content line" }],
            type: "string",
        },
        codeBlock: {
            name: "Code Block",
            desc: "Template for a code block",
            vars: [
                { name: "$value", desc: "Code block content" },
                { name: "$lang", desc: "programming language, if provided" },
                { name: "$meta", desc: "Metadata, if provided" },
            ],
            type: "string",
        },
        codeInline: {
            name: "Code Inline",
            desc: "Template for inline code",
            vars: [{ name: "$value", desc: "Code content" }],
            type: "string",
        },
        embeddedWikilink: {
            name: "Embedded Wikilink",
            desc: "Template for an embedded wikilink",
            vars: [
                { name: "$link", desc: "Wikilink target" },
                { name: "$text", desc: "Link text" },
            ],
            type: "string",
        },
        heading1: {
            name: "Heading 1",
            desc: "Template for heading 1",
            vars: [
                { name: "$value", desc: "Heading content" },
                { name: "$level", desc: "1" },
            ],
            type: "string",
        },
        heading2: {
            name: "Heading 2",
            desc: "Template for heading 2",
            vars: [
                { name: "$value", desc: "Heading content" },
                { name: "$level", desc: "2" },
            ],
            type: "string",
        },
        heading3: {
            name: "Heading 3",
            desc: "Template for heading 3",
            vars: [
                { name: "$value", desc: "Heading content" },
                { name: "$level", desc: "3" },
            ],
            type: "string",
        },
        heading4: {
            name: "Heading 4",
            desc: "Template for heading 4",
            vars: [
                { name: "$value", desc: "Heading content" },
                { name: "$level", desc: "4" },
            ],
            type: "string",
        },
        heading5: {
            name: "Heading 5",
            desc: "Template for heading 5",
            vars: [
                { name: "$value", desc: "Heading content" },
                { name: "$level", desc: "5" },
            ],
            type: "string",
        },
        heading6: {
            name: "Heading 6",
            desc: "Template for heading 6",
            vars: [
                { name: "$value", desc: "Heading content" },
                { name: "$level", desc: "6" },
            ],
            type: "string",
        },
        horizontalRule: {
            name: "Horizontal Rule",
            desc: "Template for a horizontal rule",
            type: "string",
        },
        image: {
            name: "Image",
            desc: "Template for an image in Markdown syntax",
            vars: [
                { name: "$src", desc: "Image source" },
                { name: "$alt", desc: "Image alt text" },
                { name: "$title", desc: "Image title" },
            ],
            type: "string",
        },
        italic: {
            name: "Italic",
            desc: "Template for italic text",
            vars: [{ name: "$value", desc: "Italic text content" }],
            type: "string",
        },
        lineBreak: {
            name: "Line Break",
            desc: "Template for a line break",
            type: "string",
        },
        link: {
            name: "Link",
            desc: "Template for a link in Markdown syntax",
            vars: [
                { name: "$src", desc: "Link target" },
                { name: "$alt", desc: "Link text" },
                { name: "$title", desc: "Link title" },
            ],
            type: "string",
        },
        listItemOrdered: {
            name: "Ordered List Item",
            desc: "Template for an ordered list item",
            vars: [
                { name: "$value", desc: "List item content" },
                { name: "$index", desc: "List item index" },
                { name: "$indent", desc: "List item indentation" },
            ],
            type: "string",
        },
        listItemUnordered: {
            name: "Unordered List Item",
            desc: "Template for an unordered list item",
            vars: [
                { name: "$value", desc: "List item content" },
                { name: "$indent", desc: "List item indentation" },
            ],
            type: "string",
        },
        mathBlock: {
            name: "Math Block",
            desc: "Template for a math block",
            vars: [
                { name: "$value", desc: "Math block content" },
                { name: "$meta", desc: "Metadata" },
            ],
            type: "string",
        },
        mathInline: {
            name: "Math Inline",
            desc: "Template for inline math",
            vars: [{ name: "$value", desc: "Math content" }],
            type: "string",
        },
        orderedList: {
            name: "Ordered List",
            desc: "Template for an ordered list",
            vars: [
                { name: "$content", desc: "List items" },
                { name: "$start", desc: "Start number" },
            ],
            type: "string",
        },
        paragraph: {
            name: "Paragraph",
            desc: "Template for a paragraph",
            vars: [{ name: "$value", desc: "Paragraph content" }],
            type: "string",
        },
        paragraphNested: {
            name: "Paragraph Nested",
            desc: "Template for a paragraph that is nested inside another element",
            vars: [{ name: "$value", desc: "Paragraph content" }],
            type: "string",
        },
        strikethrough: {
            name: "Strikethrough",
            desc: "Template for strikethrough text",
            vars: [{ name: "$value", desc: "Strikethrough text content" }],
            type: "string",
        },
        text: {
            name: "Text",
            desc: "Template for plain text",
            vars: [{ name: "$value", desc: "Text content" }],
            type: "string",
        },
        unorderedList: {
            name: "Unordered List",
            desc: "Template for an unordered list",
            vars: [{ name: "$content", desc: "List items" }],
            type: "string",
        },
        wikilink: {
            name: "Wikilink",
            desc: "Template for a wikilink",
            vars: [
                { name: "$link", desc: "Wikilink target" },
                { name: "$text", desc: "Link text" },
            ],
            type: "string",
        },
    },
    extra: {
        before: {
            name: "Before",
            desc: "Text to be added before the content",
            type: "string",
        },
        after: {
            name: "After",
            desc: "Text to be added after the content",
            type: "string",
        },
    },
};
