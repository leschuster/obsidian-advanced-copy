/**
 * This file contains the description of all available properties in a profile.
 * It is used in the settings ui to display a description for each property.
 */

export type ProfileDesc = {
    [key: string]: ProfileDescSection;
};

export type ProfileDescSection = {
    [key: string]: ProfileDescSetting;
} & {
    _desc?: ProfileDescSetting; // metadata add a description to the section
};

export type ProfileDescSetting = {
    name: string;
    desc: string;
    type: "string" | "boolean" | "number" | "template";
    vars?: { name: string; desc: string }[];
    visible?: boolean;
    additionalTemplates?: Record<string, ProfileDescSetting>;
    optional?: boolean;
};

const defaultAdditionalTemplates: Record<string, ProfileDescSetting> = {
    templateFirstOfType: {
        name: "Template first of type",
        desc: "Template for the first element of this type",
        type: "string",
    },
    templateLastOfType: {
        name: "Template last of type",
        desc: "Template for the last element of this type",
        type: "string",
    },
    templateFirstChild: {
        name: "Template first child",
        desc: "Template for the element that is the first child of its parent",
        type: "string",
    },
    templateLastChild: {
        name: "Template last child",
        desc: "Template for the element that is the last child of its parent",
        type: "string",
    },
};

/**
 * A description of all available properties in a profile.
 *
 * The first two levels must match the structure of the Profile type.
 * Properties starting with an underscore are used for additional metadata
 * to keep the structure.
 */
export const profileDesc: {
    [key: string]: ProfileDescSection;
} = {
    meta: {
        id: {
            name: "ID",
            desc: "Unique identifier for the profile",
            type: "string",
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
            name: "Command: copy selection",
            desc: "Add a command to copy the current selection",
            type: "boolean",
        },
        cmdPage: {
            name: "Command: copy page",
            desc: "Add a command to copy the entire page",
            type: "boolean",
        },
        replaceGemojiShortcodes: {
            name: "Replace gemoji shortcodes",
            desc: "Replace gemoji shortcodes with their unicode equivalent",
            type: "boolean",
        },
        configVersion: {
            name: "Configuration version",
            desc: "Version of the profile configuration",
            type: "number",
            visible: false,
        },
        doNotUpdate: {
            name: "Do not update",
            desc: "Applies only if this is a default profile. Check this to prevent the profile from being updated when the plugin is updated. If you leave this unchecked, you will be asked if you want to update or keep the changes.",
            type: "boolean",
            optional: true,
        },
    },
    templates: {
        _desc: {
            name: "METADATA",
            desc: `Templates are used to define the output of the copied text. You can use variables to insert dynamic content. Each Markdown element has their own set of variables available.

In addition, the following global variables can be used:

- **$vaultName**: The name of the vault
- **$fileBasename**: The name of the file without the extension
- **$fileExtension**: The extension of the file
- **$fileName**: The name of the file with the extension
- **$filePath**: The path of the file relative to the vaults root
- **$date**: The current date (e.g. '23/09/2024')
- **$time**: The current time (e.g. '10:10:00')

You may also use modifiers to transform text in a custom way. The following modifiers are available:
- **$upper{text}**: Convert text to uppercase
- **$lower{text}**: Convert text to lowercase
- **$capitalize{text}**: Capitalize the first letter of text
- **$reverse{text}**: Reverse the text
- **$blank{text}**: Replace text with an empty string
- **$replace{text,from,to}**: Replace all occurrences of 'from' with 'to' in text

Example: \`$upper{Hello, World!}\` will output 'HELLO, WORLD!'
`,
            type: "string",
            visible: false,
        },
        blockquoteLine: {
            name: "Blockquote line",
            desc: "Template for a single blockquote line",
            vars: [{ name: "$value", desc: "Blockquote line content" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        blockquoteWrapper: {
            name: "Blockquote wrapper",
            desc: "Template for a blockquote. Contains all blockquote lines.",
            vars: [{ name: "$content", desc: "Blockquote lines" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        bold: {
            name: "Bold",
            desc: "Template for bold text",
            vars: [{ name: "$value", desc: "Bold text content" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
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
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        calloutContentLine: {
            name: "Callout content line",
            desc: "Template for a single callout content line",
            vars: [{ name: "$value", desc: "Callout content line" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        codeBlock: {
            name: "Code block",
            desc: "Template for a code block",
            vars: [
                { name: "$value", desc: "Code block content" },
                { name: "$lang", desc: "Programming language, if provided" },
                { name: "$meta", desc: "Metadata, if provided" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        codeInline: {
            name: "Code inline",
            desc: "Template for inline code",
            vars: [{ name: "$value", desc: "Code content" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        embeddedWikilink: {
            name: "Embedded wikilink",
            desc: "Template for an embedded wikilink",
            vars: [
                { name: "$link", desc: "Wikilink target" },
                { name: "$text", desc: "Link text" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        heading1: {
            name: "Heading 1",
            desc: "Template for heading 1",
            vars: [
                { name: "$value", desc: "Heading content" },
                { name: "$level", desc: "1" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        heading2: {
            name: "Heading 2",
            desc: "Template for heading 2",
            vars: [
                { name: "$value", desc: "Heading content" },
                { name: "$level", desc: "2" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        heading3: {
            name: "Heading 3",
            desc: "Template for heading 3",
            vars: [
                { name: "$value", desc: "Heading content" },
                { name: "$level", desc: "3" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        heading4: {
            name: "Heading 4",
            desc: "Template for heading 4",
            vars: [
                { name: "$value", desc: "Heading content" },
                { name: "$level", desc: "4" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        heading5: {
            name: "Heading 5",
            desc: "Template for heading 5",
            vars: [
                { name: "$value", desc: "Heading content" },
                { name: "$level", desc: "5" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        heading6: {
            name: "Heading 6",
            desc: "Template for heading 6",
            vars: [
                { name: "$value", desc: "Heading content" },
                { name: "$level", desc: "6" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        highlight: {
            name: "Highlight",
            desc: "Template for highlighted text",
            vars: [{ name: "$value", desc: "Highlight content" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        horizontalRule: {
            name: "Horizontal rule",
            desc: "Template for a horizontal rule",
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        image: {
            name: "Image",
            desc: "Template for an image in Markdown syntax",
            vars: [
                { name: "$src", desc: "Image source" },
                { name: "$alt", desc: "Image alt text" },
                { name: "$title", desc: "Image title" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        italic: {
            name: "Italic",
            desc: "Template for italic text",
            vars: [{ name: "$value", desc: "Italic text content" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        lineBreak: {
            name: "Line break",
            desc: "Template for a line break",
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        link: {
            name: "Link",
            desc: "Template for a link in Markdown syntax",
            vars: [
                { name: "$src", desc: "Link target" },
                { name: "$alt", desc: "Link text" },
                { name: "$title", desc: "Link title" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        mathBlock: {
            name: "Math block",
            desc: "Template for a math block",
            vars: [
                { name: "$value", desc: "Math block content" },
                { name: "$meta", desc: "Metadata" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        mathInline: {
            name: "Math inline",
            desc: "Template for inline math",
            vars: [{ name: "$value", desc: "Math content" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        orderedList: {
            name: "Ordered list",
            desc: "Template for an ordered list",
            vars: [
                { name: "$content", desc: "List items" },
                { name: "$start", desc: "Start number" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        listItemOrdered: {
            name: "Ordered list item",
            desc: "Template for an ordered list item",
            vars: [
                { name: "$value", desc: "List item content" },
                { name: "$index", desc: "List item index" },
                { name: "$indent", desc: "List item indentation" },
            ],
            type: "template",
            additionalTemplates: {
                ...defaultAdditionalTemplates,
                templateFirstChildNested: {
                    name: "Template first child (nested)",
                    desc: "Template for the element that is the first child of its parent and is in a nested list",
                    type: "string",
                },
                templateLastChildNested: {
                    name: "Template last child (nested)",
                    desc: "Template for the element that is the last child of its parent and is in a nested list",
                    type: "string",
                },
            },
        },
        paragraph: {
            name: "Paragraph",
            desc: "Template for a paragraph",
            vars: [{ name: "$value", desc: "Paragraph content" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        paragraphNested: {
            name: "Paragraph nested",
            desc: "Template for a paragraph that is nested inside another element",
            vars: [{ name: "$value", desc: "Paragraph content" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        strikethrough: {
            name: "Strikethrough",
            desc: "Template for strikethrough text",
            vars: [{ name: "$value", desc: "Strikethrough text content" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        text: {
            name: "Text",
            desc: "Template for plain text",
            vars: [{ name: "$value", desc: "Text content" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        unorderedList: {
            name: "Unordered list",
            desc: "Template for an unordered list",
            vars: [{ name: "$content", desc: "List items" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        listItemUnordered: {
            name: "Unordered list item",
            desc: "Template for an unordered list item",
            vars: [
                { name: "$value", desc: "List item content" },
                { name: "$indent", desc: "List item indentation" },
            ],
            type: "template",
            additionalTemplates: {
                ...defaultAdditionalTemplates,
                templateFirstChildNested: {
                    name: "Template first child (nested)",
                    desc: "Template for the element that is the first child of its parent and is in a nested list",
                    type: "string",
                },
                templateLastChildNested: {
                    name: "Template last child (nested)",
                    desc: "Template for the element that is the last child of its parent and is in a nested list",
                    type: "string",
                },
            },
        },
        wikilink: {
            name: "Wikilink",
            desc: "Template for a wikilink",
            vars: [
                { name: "$link", desc: "Wikilink target" },
                { name: "$text", desc: "Link text" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
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
