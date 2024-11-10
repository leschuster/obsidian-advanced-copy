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
                blockquoteLine: "> $value\n",
                blockquoteWrapper: "$content\n",
                bold: "**$value**",
                callout: "> [!$type]$behavior $title\n$content\n",
                calloutContentLine: "> $value\n",
                codeBlock: "```$lang\n$value\n```\n\n",
                codeInline: "`$value`",
                embeddedWikilink: "![[$link|$text]]",
                heading1: "# $value\n\n",
                heading2: "## $value\n\n",
                heading3: "### $value\n\n",
                heading4: "#### $value\n\n",
                heading5: "##### $value\n\n",
                heading6: "###### $value\n\n",
                highlight: "==$value==",
                horizontalRule: "---\n\n",
                image: "![$alt]($src)",
                italic: "_$value_",
                lineBreak: "\n",
                link: "[$alt]($src)",
                listItemOrdered: "$indent$index. $value\n",
                listItemUnordered: "$indent-   $value\n",
                mathBlock: "$$\n$value\n$$\n\n",
                mathInline: "$$value$",
                orderedList: "$content\n\n",
                paragraph: "$value\n\n",
                paragraphNested: "$value",
                strikethrough: "~~$value~~",
                text: "$value",
                unorderedList: "$content\n\n",
                wikilink: "[[$link|$text]]",
            },
            extra: {
                before: "",
                after: "\n",
            },
        },
        copy_with_backlink: {
            meta: {
                id: "copy_with_backlink",
                name: "Copy with backlink",
                description: "Copy with backlink to source file",
                cmdSelection: false,
                cmdPage: false,
                replaceGemojiShortcodes: false,
                configVersion: 1,
            },
            templates: {
                blockquoteLine: "> $value\n",
                blockquoteWrapper: "$content\n",
                bold: "**$value**",
                callout: "> [!$type]$behavior $title\n$content\n",
                calloutContentLine: "> $value\n",
                codeBlock: "```$lang\n$value\n```\n\n",
                codeInline: "`$value`",
                embeddedWikilink: "![[$link|$text]]",
                heading1: "# $value\n\n",
                heading2: "## $value\n\n",
                heading3: "### $value\n\n",
                heading4: "#### $value\n\n",
                heading5: "##### $value\n\n",
                heading6: "###### $value\n\n",
                highlight: "==$value==",
                horizontalRule: "---\n\n",
                image: "![$alt]($src)",
                italic: "_$value_",
                lineBreak: "\n",
                link: "[$alt]($src)",
                listItemOrdered: "$indent$index. $value\n",
                listItemUnordered: "$indent-   $value\n",
                mathBlock: "$$\n$value\n$$\n\n",
                mathInline: "$$value$",
                orderedList: "$content\n\n",
                paragraph: "$value\n\n",
                paragraphNested: "$value",
                strikethrough: "~~$value~~",
                text: "$value",
                unorderedList: "$content\n\n",
                wikilink: "[[$link|$text]]",
            },
            extra: {
                before: "[[$fileName]]\n",
                after: "\n",
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
                blockquoteWrapper: "<blockquote>$content</blockquote>",
                bold: "<strong>$value</strong>",
                callout:
                    '<div class="callout callout-$type callout-closeable-$closeable callout-default-open-$default_open"><h2>$title</h2><div>$content</div></div>',
                calloutContentLine: "$value",
                codeBlock: "<pre><code>$value</code></pre>",
                codeInline: "<code>$value</code>",
                embeddedWikilink:
                    '<a href="obsidian://open?vault=$vaultName&file=$link">$text</a>',
                heading1: "<h1>$value</h1>",
                heading2: "<h2>$value</h2>",
                heading3: "<h3>$value</h3>",
                heading4: "<h4>$value</h4>",
                heading5: "<h5>$value</h5>",
                heading6: "<h6>$value</h6>",
                highlight: "<mark>$value</mark>",
                horizontalRule: "<hr />",
                image: '<img src="$src" alt="$alt" />',
                italic: "<em>$value</em>",
                lineBreak: "<br />",
                link: '<a href="$src">$alt</a>',
                listItemOrdered: "<li>$value</li>",
                listItemUnordered: "<li>$value</li>",
                mathBlock: "\\[$value\\]",
                mathInline: "\\($value\\)",
                orderedList: "<ol>$content</ol>",
                paragraph: "<p>$value</p>",
                paragraphNested: "<p>$value</p>",
                strikethrough: "<del>$value</del>",
                text: "$value",
                unorderedList: "<ul>$content</ul>",
                wikilink:
                    '<a href="obsidian://open?vault=$vaultName&file=$link">$text</a>',
            },
            extra: {
                before: "",
                after: "",
            },
        },
        markdown_to_anki: {
            meta: {
                id: "markdown_to_anki",
                name: "Markdown to Anki HTML",
                description: "Convert Markdown to Anki HTML",
                cmdSelection: false,
                cmdPage: false,
                replaceGemojiShortcodes: true,
                configVersion: 1,
            },
            templates: {
                blockquoteLine: "$value",
                blockquoteWrapper: "<blockquote>$content</blockquote>",
                bold: "<strong>$value</strong>",
                callout:
                    '<div class="callout callout-$type callout-closeable-$closeable callout-default-open-$default_open"><h2>$title</h2><div>$content</div></div>',
                calloutContentLine: "$value",
                codeBlock: "<pre><code>$value</code></pre>",
                codeInline: "<code>$value</code>",
                embeddedWikilink:
                    '<a href="obsidian://open?vault=$vaultName&file=$link">$text</a>',
                heading1: "<h1>$value</h1>",
                heading2: "<h2>$value</h2>",
                heading3: "<h3>$value</h3>",
                heading4: "<h4>$value</h4>",
                heading5: "<h5>$value</h5>",
                heading6: "<h6>$value</h6>",
                highlight: "<mark>$value</mark>",
                horizontalRule: "<hr />",
                image: '<img src="$src" alt="$alt" />',
                italic: "<em>$value</em>",
                lineBreak: "<br />",
                link: '<a href="$src">$alt</a>',
                listItemOrdered: "<li>$value</li>",
                listItemUnordered: "<li>$value</li>",
                mathBlock: '<anki-mathjax block="true">$value</anki-mathjax>',
                mathInline: "<anki-mathjax>$value</anki-mathjax>",
                orderedList: "<ol>$content</ol>",
                paragraph: "<p>$value</p>",
                paragraphNested: "$value",
                strikethrough: "<del>$value</del>",
                text: "$value",
                unorderedList: "<ul>$content</ul>",
                wikilink:
                    '<a href="obsidian://open?vault=$vaultName&file=$link">$text</a>',
            },
            extra: {
                before: "",
                after: "",
            },
        },
    },
};
