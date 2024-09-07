import { AdvancedCopyPluginSettings } from "./settings";

export const DEFAULT_SETTINGS: AdvancedCopyPluginSettings = {
	debug_mode: false,
	profiles: {
		markdown_to_html: {
			version: 1,
			id: "markdown_to_html",
			name: "MD -> HTML",
			description: "Convert Markdown to HTML",
			cmd_selection: true,
			cmd_page: true,
			before: "",
			after: "",
			text: "$0",
			bold: "<strong>$0</strong>",
			italic: "<em>$0</em>",
			inline_math: "\\($0\\)",
			wikilink: "$0",
			empty_line: "<br />",
			paragraph: "<p>$0</p>",
			heading: "<h$1>$0</h$1>",
			math_block: "\\[$0\\]",
			code_block: "$0",
		},
	},
};
