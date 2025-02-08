/**
 * Advanced Copy Plugin Settings
 */
export type AdvancedCopyPluginSettings = {
    profiles: { [key: string]: Profile };
};

export type ProfileTemplate =
    | string
    | {
          template: string;
          templateFirstOfType?: string;
          templateLastOfType?: string;
          templateFirstChild?: string;
          templateLastChild?: string;
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
        blockquoteLine: ProfileTemplate;
        blockquoteWrapper: ProfileTemplate;
        bold: ProfileTemplate;
        callout: ProfileTemplate;
        calloutContentLine: ProfileTemplate;
        codeBlock: ProfileTemplate;
        codeInline: ProfileTemplate;
        embeddedWikilink: ProfileTemplate;
        heading1: ProfileTemplate;
        heading2: ProfileTemplate;
        heading3: ProfileTemplate;
        heading4: ProfileTemplate;
        heading5: ProfileTemplate;
        heading6: ProfileTemplate;
        highlight: ProfileTemplate;
        horizontalRule: ProfileTemplate;
        image: ProfileTemplate;
        italic: ProfileTemplate;
        lineBreak: ProfileTemplate;
        link: ProfileTemplate;
        listItemOrdered: ProfileTemplate;
        listItemUnordered: ProfileTemplate;
        mathBlock: ProfileTemplate;
        mathInline: ProfileTemplate;
        orderedList: ProfileTemplate;
        paragraph: ProfileTemplate;
        paragraphNested: ProfileTemplate;
        strikethrough: ProfileTemplate;
        text: ProfileTemplate;
        unorderedList: ProfileTemplate;
        wikilink: ProfileTemplate;
    };
    extra: {
        before: ProfileTemplate;
        after: ProfileTemplate;
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
    },
    templates: {
        blockquoteLine: {
            name: "Blockquote line",
            desc: "Template for a single blockquote line",
            vars: [{ name: "$value", desc: "Blockquote line content" }],
            type: "string",
        },
        blockquoteWrapper: {
            name: "Blockquote wrapper",
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
            name: "Callout content line",
            desc: "Template for a single callout content line",
            vars: [{ name: "$value", desc: "Callout content line" }],
            type: "string",
        },
        codeBlock: {
            name: "Code block",
            desc: "Template for a code block",
            vars: [
                { name: "$value", desc: "Code block content" },
                { name: "$lang", desc: "Programming language, if provided" },
                { name: "$meta", desc: "Metadata, if provided" },
            ],
            type: "string",
        },
        codeInline: {
            name: "Code inline",
            desc: "Template for inline code",
            vars: [{ name: "$value", desc: "Code content" }],
            type: "string",
        },
        embeddedWikilink: {
            name: "Embedded wikilink",
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
        highlight: {
            name: "Highlight",
            desc: "Template for highlighted text",
            vars: [{ name: "$value", desc: "Highlight content" }],
            type: "string",
        },
        horizontalRule: {
            name: "Horizontal rule",
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
            name: "Line break",
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
            name: "Ordered list item",
            desc: "Template for an ordered list item",
            vars: [
                { name: "$value", desc: "List item content" },
                { name: "$index", desc: "List item index" },
                { name: "$indent", desc: "List item indentation" },
            ],
            type: "string",
        },
        listItemUnordered: {
            name: "Unordered list item",
            desc: "Template for an unordered list item",
            vars: [
                { name: "$value", desc: "List item content" },
                { name: "$indent", desc: "List item indentation" },
            ],
            type: "string",
        },
        mathBlock: {
            name: "Math block",
            desc: "Template for a math block",
            vars: [
                { name: "$value", desc: "Math block content" },
                { name: "$meta", desc: "Metadata" },
            ],
            type: "string",
        },
        mathInline: {
            name: "Math inline",
            desc: "Template for inline math",
            vars: [{ name: "$value", desc: "Math content" }],
            type: "string",
        },
        orderedList: {
            name: "Ordered list",
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
            name: "Paragraph nested",
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
            name: "Unordered list",
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
/*
export class Profile {
    public meta: ProfileSectionMeta;
    public templates: ProfileSectionTemplates;
    public extra: ProfileSectionExtra;

    constructor(serialized?: ProfileSerialized) {
        if (serialized) {
            this.meta = new ProfileSectionMeta(serialized.meta);
            this.templates = new ProfileSectionTemplates(serialized.templates);
            this.extra = new ProfileSectionExtra(serialized.extra);
        } else {
            this.meta = new ProfileSectionMeta();
            this.templates = new ProfileSectionTemplates();
            this.extra = new ProfileSectionExtra();
        }
    }

    public serialize(): ProfileSerialized {
        return {
            meta: this.meta.serialize(),
            templates: this.templates.serialize(),
            extra: this.extra.serialize(),
        };
    }
}

class ProfileSectionMeta {
    public id: string;
    public name: string;
    public description: string;
    public cmdSelection: boolean;
    public cmdPage: boolean;
    public replaceGemojiShortcodes: boolean;
    public configVersion: number;

    constructor(serialized?: ProfileSerialized["meta"]) {
        if (serialized) {
            this.id = serialized.id;
            this.name = serialized.name;
            this.description = serialized.description;
            this.cmdSelection = serialized.cmdSelection;
            this.cmdPage = serialized.cmdPage;
            this.replaceGemojiShortcodes = serialized.replaceGemojiShortcodes;
            this.configVersion = serialized.configVersion;
        } else {
            this.id = "";
            this.name = "";
            this.description = "";
            this.cmdSelection = false;
            this.cmdPage = false;
            this.replaceGemojiShortcodes = false;
            this.configVersion = 1;
        }
    }

    public serialize(): ProfileSerialized["meta"] {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            cmdSelection: this.cmdSelection,
            cmdPage: this.cmdPage,
            replaceGemojiShortcodes: this.replaceGemojiShortcodes,
            configVersion: this.configVersion,
        };
    }
}

class ProfileTemplate {
    public template: string;
    public templateFirstOfType?: string;
    public templateLastOfType?: string;
    public templateFirstChild?: string;
    public templateLastChild?: string;

    constructor(serialized: ProfileSerializedTemplate) {
        if (typeof serialized === "string") {
            this.template = serialized;
        } else {
            this.template = serialized.template;
            this.templateFirstOfType = serialized.templateFirstOfType;
            this.templateLastOfType = serialized.templateLastOfType;
            this.templateFirstChild = serialized.templateFirstChild;
            this.templateLastChild = serialized.templateLastChild;
        }
    }

    public serialize(): ProfileSerializedTemplate {
        return {
            template: this.template,
            templateFirstOfType: this.templateFirstOfType,
            templateLastOfType: this.templateLastOfType,
            templateFirstChild: this.templateFirstChild,
            templateLastChild: this.templateLastChild,
        };
    }

    public chooseTemplate({
        isFirstOfType,
        isLastOfType,
        isFirstChild,
        isLastChild,
    }: {
        isFirstOfType: boolean;
        isLastOfType: boolean;
        isFirstChild: boolean;
        isLastChild: boolean;
    }): string {
        switch (true) {
            case this.templateFirstChild && isFirstChild:
                return this.templateFirstChild;
            case this.templateLastChild && isLastChild:
                return this.templateLastChild;
            case this.templateFirstOfType && isFirstOfType:
                return this.templateFirstOfType;
            case this.templateLastOfType && isLastOfType:
                return this.templateLastOfType;
            default:
                return this.template;
        }
    }
}

class ProfileSectionTemplates {
    [key: string]: ProfileTemplate;

    public blockquoteLine: ProfileTemplate = new ProfileTemplate("");
    public blockquoteWrapper: ProfileTemplate = new ProfileTemplate("");
    public bold: ProfileTemplate = new ProfileTemplate("");
    public callout: ProfileTemplate = new ProfileTemplate("");
    public calloutContentLine: ProfileTemplate = new ProfileTemplate("");
    public codeBlock: ProfileTemplate = new ProfileTemplate("");
    public codeInline: ProfileTemplate = new ProfileTemplate("");
    public embeddedWikilink: ProfileTemplate = new ProfileTemplate("");
    public heading1: ProfileTemplate = new ProfileTemplate("");
    public heading2: ProfileTemplate = new ProfileTemplate("");
    public heading3: ProfileTemplate = new ProfileTemplate("");
    public heading4: ProfileTemplate = new ProfileTemplate("");
    public heading5: ProfileTemplate = new ProfileTemplate("");
    public heading6: ProfileTemplate = new ProfileTemplate("");
    public highlight: ProfileTemplate = new ProfileTemplate("");
    public horizontalRule: ProfileTemplate = new ProfileTemplate("");
    public image: ProfileTemplate = new ProfileTemplate("");
    public italic: ProfileTemplate = new ProfileTemplate("");
    public lineBreak: ProfileTemplate = new ProfileTemplate("");
    public link: ProfileTemplate = new ProfileTemplate("");
    public listItemOrdered: ProfileTemplate = new ProfileTemplate("");
    public listItemUnordered: ProfileTemplate = new ProfileTemplate("");
    public mathBlock: ProfileTemplate = new ProfileTemplate("");
    public mathInline: ProfileTemplate = new ProfileTemplate("");
    public orderedList: ProfileTemplate = new ProfileTemplate("");
    public paragraph: ProfileTemplate = new ProfileTemplate("");
    public paragraphNested: ProfileTemplate = new ProfileTemplate("");
    public strikethrough: ProfileTemplate = new ProfileTemplate("");
    public text: ProfileTemplate = new ProfileTemplate("");
    public unorderedList: ProfileTemplate = new ProfileTemplate("");
    public wikilink: ProfileTemplate = new ProfileTemplate("");

    constructor(serialized?: TemplatesType) {
        for (const key in this) {
            const value = serialized?.[key] ?? "";
            this[key] = new ProfileTemplate(value);
        }
    }
}

type TemplatesType = {
    [K in keyof ProfileSectionTemplates]: ProfileSerializedTemplate;
};

class ProfileSectionExtra {
    [key: string]: ProfileTemplate;

    public before: ProfileTemplate;
    public after: ProfileTemplate;


}

*/
