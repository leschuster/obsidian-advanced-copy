export type AdvancedCopyPluginSettings = {
	debug_mode: boolean;
	profiles: { [key: string]: Profile };
};

export type Profile = {
	meta: {
		id: string;
		name: string;
		description: string;
		cmdSelection: boolean;
		cmdPage: boolean;
		configVersion: number;
	};
	templates: {
		blockquoteLine: string;
		blockquoteWrapper: string;
		bold: string;
		codeBlock: string;
		codeInline: string;
		heading1: string;
		heading2: string;
		heading3: string;
		heading4: string;
		heading5: string;
		heading6: string;
		horizontalRule: string;
		image: string;
		italic: string;
		lineBreak: string;
		link: string;
		listItem: string;
		mathBlock: string;
		mathInline: string;
		orderedList: string;
		paragraph: string;
		strikethrough: string;
		text: string;
		unorderedList: string;
	};
	extra: {
		before: string;
		after: string;
	};
};
