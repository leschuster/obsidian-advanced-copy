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
		bold: string;
		blockquoteLine: string;
		blockquoteWrapper: string;
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
		mathBlock: string;
		mathInline: string;
		paragraph: string;
		text: string;
	};
	extra: {
		before: string;
		after: string;
	};
};
