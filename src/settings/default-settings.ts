import { AdvancedCopyPluginSettings } from "./settings";

export const DEFAULT_SETTINGS: AdvancedCopyPluginSettings = {
    profiles: {
        markdown_to_markdown: {
            meta: {
                id: "markdown_to_markdown",
                name: "Markdown to Markdown",
                description: "Convert Markdown to Markdown",
                cmdSelection: false,
                cmdPage: false,
                replaceGemojiShortcodes: false,
                configVersion: 1,
            },
            templates: {
                blockquoteLine: "> $value",
                blockquoteWrapper: "$value",
                bold: "**$value**",
                callout: "> [!$type]$behavior $title\n$content",
                calloutContentLine: "> $value",
                codeBlock: "```$lang\n$value\n```",
                codeInline: "`$value`",
                embeddedWikilink: "![[$link|$value]]",
                heading1: "# $value",
                heading2: "## $value",
                heading3: "### $value",
                heading4: "#### $value",
                heading5: "##### $value",
                heading6: "###### $value",
                horizontalRule: "---\n",
                image: "![$alt]($url)",
                italic: "*$value*",
                lineBreak: "\n",
                link: "[$alt]($url)",
                listItemOrdered: "1. $value",
                listItemUnordered: "- $value",
                mathBlock: "$$$value$$",
                mathInline: "$$value$",
                orderedList: "$value",
                paragraph: "$value",
                strikethrough: "~~$value~~",
                text: "$value",
                unorderedList: "$value",
                wikilink: "[[$link|$value]]",
            },
            extra: {
                before: "",
                after: "",
            },
        },
        markdown_to_html: {
            meta: {
                id: "markdown_to_html",
                name: "Markdown to HTML",
                description: "Convert Markdown to HTML",
                cmdSelection: false,
                cmdPage: false,
                replaceGemojiShortcodes: true,
                configVersion: 1,
            },
            templates: {
                blockquoteLine: "$value",
                blockquoteWrapper: "<blockquote>$value</blockquote>",
                bold: "<strong>$value</strong>",
                callout:
                    '<div class="callout callout-$type callout-closeable-$closeable callout-default-open-$default_open"><h2>$title</h2><div>$content</div></div>',
                calloutContentLine: "$value",
                codeBlock: "<pre><code>$value</code></pre>",
                codeInline: "<code>$value</code>",
                embeddedWikilink:
                    '<a href="obsidian://open?vault=$vaultName&file=$link">$value</a>',
                heading1: "<h1>$value</h1>",
                heading2: "<h2>$value</h2>",
                heading3: "<h3>$value</h3>",
                heading4: "<h4>$value</h4>",
                heading5: "<h5>$value</h5>",
                heading6: "<h6>$value</h6>",
                horizontalRule: "<hr />",
                image: '<img src="$url" alt="$alt" />',
                italic: "<em>$value</em>",
                lineBreak: "<br />",
                link: '<a href="$url">$alt</a>',
                listItemOrdered: "<li>$value</li>",
                listItemUnordered: "<li>$value</li>",
                mathBlock: "\\[$value\\]",
                mathInline: "\\($value\\)",
                orderedList: "<ol>$value</ol>",
                paragraph: "<p>$value</p>",
                strikethrough: "<del>$value</del>",
                text: "$value",
                unorderedList: "<ul>$value</ul>",
                wikilink:
                    '<a href="obsidian://open?vault=$vaultName&file=$link">$value</a>',
            },
            extra: {
                before: "",
                after: "",
            },
        },
        markdown_to_anki: {
            meta: {
                id: "markdown_to_anki",
                name: "Markdown to Anki",
                description: "Convert Markdown to Anki HTML",
                cmdSelection: false,
                cmdPage: false,
                replaceGemojiShortcodes: true,
                configVersion: 1,
            },
            templates: {
                blockquoteLine: "$value",
                blockquoteWrapper: "<blockquote>$value</blockquote>",
                bold: "<strong>$value</strong>",
                callout:
                    '<div class="callout callout-$type callout-closeable-$closeable callout-default-open-$default_open"><h2>$title</h2><div>$content</div></div>',
                calloutContentLine: "$value",
                codeBlock: "<pre><code>$value</code></pre>",
                codeInline: "<code>$value</code>",
                embeddedWikilink:
                    '<a href="obsidian://open?vault=$vaultName&file=$link">$value</a>',
                heading1: "<h1>$value</h1>",
                heading2: "<h2>$value</h2>",
                heading3: "<h3>$value</h3>",
                heading4: "<h4>$value</h4>",
                heading5: "<h5>$value</h5>",
                heading6: "<h6>$value</h6>",
                horizontalRule: "<hr />",
                image: '<img src="$url" alt="$alt" />',
                italic: "<em>$value</em>",
                lineBreak: "<br />",
                link: '<a href="$url">$alt</a>',
                listItemOrdered: "<li>$value</li>",
                listItemUnordered: "<li>$value</li>",
                mathBlock: '<anki-mathjax block="true">$value</anki-mathjax>',
                mathInline: "<anki-mathjax>$value</anki-mathjax>",
                orderedList: "<ol>$value</ol>",
                paragraph: "<p>$value</p>",
                strikethrough: "<del>$value</del>",
                text: "$value",
                unorderedList: "<ul>$value</ul>",
                wikilink:
                    '<a href="obsidian://open?vault=$vaultName&file=$link">$value</a>',
            },
            extra: {
                before: "",
                after: "",
            },
        },
        markdown_with_reference: {
            meta: {
                id: "markdown_with_reference",
                name: "Markdown with Reference",
                description:
                    "Add a link to the note at the beginning of the copied text",
                cmdSelection: false,
                cmdPage: false,
                replaceGemojiShortcodes: false,
                configVersion: 1,
            },
            templates: {
                blockquoteLine: "> $value",
                blockquoteWrapper: "$value",
                bold: "**$value**",
                callout: "> [!$type]$behavior $title\n$content",
                calloutContentLine: "> $value",
                codeBlock: "```$lang\n$value\n```",
                codeInline: "`$value`",
                embeddedWikilink: "![[$link|$value]]",
                heading1: "# $value",
                heading2: "## $value",
                heading3: "### $value",
                heading4: "#### $value",
                heading5: "##### $value",
                heading6: "###### $value",
                horizontalRule: "---\n",
                image: "![$alt]($url)",
                italic: "*$value*",
                lineBreak: "\n",
                link: "[$alt]($url)",
                listItemOrdered: "1. $value",
                listItemUnordered: "- $value",
                mathBlock: "$$$value$$",
                mathInline: "$$value$",
                orderedList: "$value",
                paragraph: "$value",
                strikethrough: "~~$value~~",
                text: "$value",
                unorderedList: "$value",
                wikilink: "[[$link|$value]]",
            },
            extra: {
                before: "[[fileName]]\n",
                after: "",
            },
        },
    },
};
