import { AdvancedCopyPluginSettings } from "./settings";

export const DEFAULT_SETTINGS: AdvancedCopyPluginSettings = {
    debug_mode: false,
    profiles: {
        markdown_to_html: {
            meta: {
                id: "markdown_to_html",
                name: "MD > HTML",
                description: "Convert Markdown to HTML",
                cmdSelection: true,
                cmdPage: true,
                configVersion: 1,
            },
            templates: {
                blockquoteLine: ">$value",
                blockquoteWrapper: "<blockquote>$value</blockquote>",
                bold: "<strong>$value</strong>",
                callout:
                    '<div class="callout callout-$type callout-closeable-$closeable callout-default-open-$default_open"><h2>$title</h2><div>$value</div></div>',
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
                listItem: "<li>$value</li>",
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
    },
};
