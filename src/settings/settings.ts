export type AdvancedCopyPluginSettings = {
	debug_mode: boolean;
	profiles: { [key: string]: Profile };
};

export type Profile = {
	version: number;
	id: string;
	name: string;
	description: string;
	cmd_selection: boolean;
	cmd_page: boolean;
	before: string;
	after: string;
	text: string;
	bold: string;
	italic: string;
	inline_math: string;
	wikilink: string;
	empty_line: string;
	paragraph: string;
	heading: string;
	math_block: string;
	code_block: string;
};
