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
				bold: "<strong>$value</strong>",
				blockquoteLine: ">$value",
				blockquoteWrapper: "<blockquote>$value</blockquote>",
				codeBlock: "<pre><code>$value</code></pre>",
				codeInline: "<code>$value</code>",
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
				mathBlock: "\\[$value\\]",
				mathInline: "\\($value\\)",
				paragraph: "<p>$value</p>",
				text: "$value",
			},
			extra: {
				before: "",
				after: "",
			},
		},
	},
};
