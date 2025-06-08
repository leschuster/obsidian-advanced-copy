/**
 * This file contains the description of all available properties in a profile.
 * It is used in the settings UI to display a description for each property.
 */

export type ProfileDesc = {
    [key: string]: ProfileDescSection;
};

export type ProfileDescSection = {
    [key: string]: ProfileDescSetting;
} & {
    _desc?: ProfileDescSetting; // metadata to add a description to the section
};

export type ProfileDescSetting = {
    name: string;
    desc: string;
    type: "string" | "boolean" | "number" | "template";
    vars?: { name: string; desc: string }[];
    visible?: boolean;
    readonly?: boolean;
    additionalTemplates?: Record<string, ProfileDescSetting>;
    optional?: boolean;
};

const defaultAdditionalTemplates: Record<string, ProfileDescSetting> = {
    templateFirstOfType: {
        name: "Template first of type",
        desc: "Special template applied **only to the first element** of this type",
        type: "string",
    },
    templateLastOfType: {
        name: "Template last of type",
        desc: "Special template applied **only to the last element** of this type",
        type: "string",
    },
    templateFirstChild: {
        name: "Template first child",
        desc: "Special template applied when this element is the **first child** of its parent element",
        type: "string",
    },
    templateLastChild: {
        name: "Template last child",
        desc: "Special template applied when this element is the **last child** of its parent element",
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
            desc: "Unique identifier for the profile. This cannot be changed once created.",
            type: "string",
            readonly: true,
        },
        name: {
            name: "Name",
            desc: "Display name for the profile.",
            type: "string",
        },
        description: {
            name: "Description",
            desc: "Detailed description of the profile's purpose and behavior.",
            type: "string",
        },
        cmdSelection: {
            name: "Command: copy selection",
            desc: "When enabled, adds a command to copy the currently selected text using this profile.",
            type: "boolean",
        },
        cmdPage: {
            name: "Command: copy page",
            desc: "When enabled, adds a command to copy the entire current document using this profile.",
            type: "boolean",
        },
        replaceGemojiShortcodes: {
            name: "Replace gemoji shortcodes",
            desc: "Example: ':wave:' will be replaced with '👋'.",
            type: "boolean",
        },
        encodeHTMLEntities: {
            name: "Encode HTML entities",
            desc: "Converts special characters to their HTML entity representations. For example, `©` becomes `&copy;`.",
            type: "boolean",
        },
        encodeHTMLEntitiesHexOnly: {
            name: "Encode HTML entities (hex only)",
            desc: "Converts special characters to their hexadecimal HTML entity representations. For example, `©` becomes `&#x00A9;`. Provides better compatibility with older browsers.",
            type: "boolean",
        },
        configVersion: {
            name: "Configuration version",
            desc: "Internal version number of the profile configuration.",
            type: "number",
            visible: false,
        },
        doNotUpdate: {
            name: "Do not update",
            desc: "**Only applies to default profiles.** When checked, prevents this profile from being automatically updated when the plugin is updated. If unchecked, you'll be asked whether to update or keep your customizations.",
            type: "boolean",
            optional: true,
        },
    },
    templates: {
        _desc: {
            name: "METADATA",
            desc: `Templates define how your Markdown elements are formatted when copied. Each template can include variables to insert dynamic content. Each Markdown element has their own set of variables available

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
            desc: "Template for a single line within a blockquote.",
            vars: [{ name: "$value", desc: "Content of this blockquote line" }],
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
            desc: "Template for bold/strong text.",
            vars: [{ name: "$value", desc: "The text with bold formatting" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        callout: {
            name: "Callout",
            desc: "Template for callout blocks.",
            vars: [
                {
                    name: "$type",
                    desc: "Callout type (e.g., 'info', 'warning', 'error')",
                },
                {
                    name: "$behavior",
                    desc: "Fold behavior: '+' (folded), '-' (expanded), or '' (default)",
                },
                {
                    name: "$content",
                    desc: "The formatted content of the callout",
                },
                { name: "$title", desc: "The title of the callout" },
                {
                    name: "$closeable",
                    desc: "Boolean indicating if the callout can be closed",
                },
                {
                    name: "$default_open",
                    desc: "Boolean indicating if the callout is open by default",
                },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        calloutContentLine: {
            name: "Callout content line",
            desc: "Template for a single line of content within a callout.",
            vars: [{ name: "$value", desc: "Content of this callout line" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        codeBlock: {
            name: "Code block",
            desc: "Template for a code block.",
            vars: [
                { name: "$value", desc: "The code content" },
                {
                    name: "$lang",
                    desc: "Programming language (if specified)",
                },
                {
                    name: "$meta",
                    desc: "Additional metadata for the code block (if provided)",
                },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        codeInline: {
            name: "Code inline",
            desc: "Template for inline code.",
            vars: [{ name: "$value", desc: "The inline code content" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        embeddedWikilink: {
            name: "Embedded wikilink",
            desc: "Template for embedded wikilinks that display the target note's content (`![[Note]]`).",
            vars: [
                { name: "$link", desc: "Target note or file being embedded" },
                {
                    name: "$text",
                    desc: "Display text",
                },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        heading1: {
            name: "Heading 1",
            desc: "Template for level 1 headings (# in MD).",
            vars: [
                { name: "$value", desc: "The heading text content" },
                { name: "$level", desc: "The heading level (always 1)" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        heading2: {
            name: "Heading 2",
            desc: "Template for level 2 headings (## in MD).",
            vars: [
                { name: "$value", desc: "The heading text content" },
                { name: "$level", desc: "The heading level (always 2)" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        heading3: {
            name: "Heading 3",
            desc: "Template for level 3 headings (### in MD).",
            vars: [
                { name: "$value", desc: "The heading text content" },
                { name: "$level", desc: "The heading level (always 3)" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        heading4: {
            name: "Heading 4",
            desc: "Template for level 4 headings (#### in MD).",
            vars: [
                { name: "$value", desc: "The heading text content" },
                { name: "$level", desc: "The heading level (always 4)" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        heading5: {
            name: "Heading 5",
            desc: "Template for level 5 headings (##### in MD).",
            vars: [
                { name: "$value", desc: "The heading text content" },
                { name: "$level", desc: "The heading level (always 5)" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        heading6: {
            name: "Heading 6",
            desc: "Template for level 6 headings (###### in MD).",
            vars: [
                { name: "$value", desc: "The heading text content" },
                { name: "$level", desc: "The heading level (always 6)" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        highlight: {
            name: "Highlight",
            desc: "Template for highlighted/marked text (==text== in MD).",
            vars: [{ name: "$value", desc: "The highlighted text content" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        horizontalRule: {
            name: "Horizontal rule",
            desc: "Template for horizontal rule/divider (--- in MD).",
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        image: {
            name: "Image",
            desc: "Template for images.",
            vars: [
                { name: "$src", desc: "Image source or URL" },
                { name: "$alt", desc: "Alternative text for the image" },
                { name: "$title", desc: "Image title" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        italic: {
            name: "Italic",
            desc: "Template for italic text.",
            vars: [{ name: "$value", desc: "The text with italic formatting" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        lineBreak: {
            name: "Line break",
            desc: "Template for line breaks.",
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        link: {
            name: "Link",
            desc: "Template for a link in Markdown syntax (`[alt](src)`).",
            vars: [
                { name: "$src", desc: "Link URL or target" },
                { name: "$alt", desc: "Visible link text" },
                { name: "$title", desc: "Optional title" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        mathBlock: {
            name: "Math block",
            desc: "Template for block math expressions ($$...$$).",
            vars: [
                { name: "$value", desc: "Math expression content" },
                { name: "$meta", desc: "Additional metadata (if provided)" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        mathInline: {
            name: "Math inline",
            desc: "Template for inline math expressions ($...$).",
            vars: [{ name: "$value", desc: "Inline math expression content" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        orderedList: {
            name: "Ordered list",
            desc: "Template for ordered (numbered) lists.",
            vars: [
                {
                    name: "$content",
                    desc: "Combined content of all list items",
                },
                { name: "$start", desc: "Starting number of the list" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        listItemOrdered: {
            name: "Ordered list item",
            desc: "Template for individual items in an ordered list.\n\n**Available variables:**\n- `$value` - The content of this list item\n- `$index` - The item's numerical position in the list\n- `$indent` - The indentation level of this item",
            vars: [
                { name: "$value", desc: "Content of this list item" },
                { name: "$index", desc: "Numerical position in the list" },
                {
                    name: "$indent",
                    desc: "Indentation level (for nested lists)",
                },
            ],
            type: "template",
            additionalTemplates: {
                ...defaultAdditionalTemplates,
                templateFirstChildNested: {
                    name: "Template first child (nested)",
                    desc: "Special template applied when this item is the first child in a nested list",
                    type: "string",
                },
                templateLastChildNested: {
                    name: "Template last child (nested)",
                    desc: "Special template applied when this item is the last child in a nested list",
                    type: "string",
                },
            },
        },
        paragraph: {
            name: "Paragraph",
            desc: "Template for standard paragraphs (on top level).",
            vars: [{ name: "$value", desc: "The paragraph content" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        paragraphNested: {
            name: "Paragraph nested",
            desc: "Template for paragraphs nested inside another element (like a list item).",
            vars: [{ name: "$value", desc: "The nested paragraph content" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        strikethrough: {
            name: "Strikethrough",
            desc: "Template for strikethrough text (~~text~~ in MD).",
            vars: [
                {
                    name: "$value",
                    desc: "The text with strikethrough formatting",
                },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        table: {
            name: "Table",
            desc: "Template for tables. Supports alignment of cell content specified in the delimiter row: `---` none, `:--` left, `:-:` center, `--:` right.",
            vars: [
                { name: "$header", desc: "Formatted table header row" },
                { name: "$content", desc: "All formatted content rows" },
                {
                    name: "$mdDelRow",
                    desc: "Markdown delimiter row (e.g., `| --- | :-: | --: |`)",
                },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        tableRow: {
            name: "Table row",
            desc: "Template for table rows (used for both header and data rows).",
            vars: [
                { name: "$content", desc: "All formatted cells in this row" },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        tableHeaderCell: {
            name: "Table header cell",
            desc: "Template for cells in the table header row.",
            vars: [
                { name: "$content", desc: "Cell content" },
                {
                    name: "$align",
                    desc: "Cell alignment: 'left', 'center', 'right', or 'default'",
                },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        tableCell: {
            name: "Table cell",
            desc: "Template for standard data cells.",
            vars: [
                { name: "$content", desc: "Cell content" },
                {
                    name: "$align",
                    desc: "Cell alignment: 'left', 'center', 'right', or 'default'",
                },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        text: {
            name: "Text",
            desc: "Template for plain text.",
            vars: [{ name: "$value", desc: "Plain text content" }],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        unorderedList: {
            name: "Unordered list",
            desc: "Template for unordered (bullet) lists.",
            vars: [
                {
                    name: "$content",
                    desc: "Combined content of all list items",
                },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
        listItemUnordered: {
            name: "Unordered list item",
            desc: "Template for individual items in an unordered list.",
            vars: [
                { name: "$value", desc: "Content of this list item" },
                {
                    name: "$indent",
                    desc: "Indentation spacing (for nested lists)",
                },
            ],
            type: "template",
            additionalTemplates: {
                ...defaultAdditionalTemplates,
                templateFirstChildNested: {
                    name: "Template first child (nested)",
                    desc: "Special template applied when this item is the first child in a nested list",
                    type: "string",
                },
                templateLastChildNested: {
                    name: "Template last child (nested)",
                    desc: "Special template applied when this item is the last child in a nested list",
                    type: "string",
                },
            },
        },
        wikilink: {
            name: "Wikilink",
            desc: "Template for internal links ([[Note]] in Obsidian).",
            vars: [
                { name: "$link", desc: "Target note or file" },
                {
                    name: "$text",
                    desc: "Display text",
                },
            ],
            type: "template",
            additionalTemplates: defaultAdditionalTemplates,
        },
    },
    extra: {
        before: {
            name: "Before",
            desc: "Text to add at the very beginning of the copied content. Useful for adding opening tags or prefixes.",
            type: "string",
        },
        after: {
            name: "After",
            desc: "Text to add at the very end of the copied content. Useful for adding closing tags or suffixes.",
            type: "string",
        },
    },
};
