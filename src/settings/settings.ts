/**
 * Advanced Copy Plugin Settings
 */
export type AdvancedCopyPluginSettings = {
    profiles: { [key: string]: Profile };
};

/**
 * A profile has all configuration needed to convert a markdown AST to a string
 * using user-defined templates. Multiple profiles can be defined to allow for
 * different output formats.
 *
 * The profile is divided into three sections:
 * - meta: Metadata about the profile
 * - templates: Templates for each markdown element
 * - extra: Additional options
 */
export type Profile = {
    //! if something is changed here, also change the profileDesc object
    meta: {
        id: string;
        name: string;
        description: string;
        cmdSelection: boolean;
        cmdPage: boolean;
        replaceGemojiShortcodes: boolean;
        configVersion: number;
        doNotUpdate?: boolean; // do not update this profile when updating the plugin
    };
    templates: {
        blockquoteLine: string | MDTemplate;
        blockquoteWrapper: string | MDTemplate;
        bold: string | MDTemplate;
        callout: string | MDTemplate;
        calloutContentLine: string | MDTemplate;
        codeBlock: string | MDTemplate;
        codeInline: string | MDTemplate;
        embeddedWikilink: string | MDTemplate;
        heading1: string | MDTemplate;
        heading2: string | MDTemplate;
        heading3: string | MDTemplate;
        heading4: string | MDTemplate;
        heading5: string | MDTemplate;
        heading6: string | MDTemplate;
        highlight: string | MDTemplate;
        horizontalRule: string | MDTemplate;
        image: string | MDTemplate;
        italic: string | MDTemplate;
        lineBreak: string | MDTemplate;
        link: string | MDTemplate;
        listItemOrdered: string | MDTemplateListItem;
        listItemUnordered: string | MDTemplateListItem;
        mathBlock: string | MDTemplate;
        mathInline: string | MDTemplate;
        orderedList: string | MDTemplate;
        paragraph: string | MDTemplate;
        paragraphNested: string | MDTemplate;
        strikethrough: string | MDTemplate;
        text: string | MDTemplate;
        unorderedList: string | MDTemplate;
        wikilink: string | MDTemplate;
    };
    extra: {
        before: string | MDTemplate;
        after: string | MDTemplate;
    };
};

/**
 * A template on how to render a markdown element.
 *
 * When the Markdown AST is traversed, each node is replaced with the template
 * of the corresponding Markdown type. Variables can be used to insert dynamic
 * content.
 */
export type MDTemplate = {
    template: string;
    templateFirstOfType?: string;
    templateLastOfType?: string;
    templateFirstChild?: string;
    templateLastChild?: string;
};

/**
 * Extended version of MDTemplate for list items.
 */
export type MDTemplateListItem = MDTemplate & {
    templateFirstChildNested?: string;
    templateLastChildNested?: string;
};
