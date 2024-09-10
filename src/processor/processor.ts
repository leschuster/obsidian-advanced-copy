import { TFile } from "obsidian";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { Profile } from "src/settings/settings";
import { unified } from "unified";
import customStringify from "./customStringify";

export class Processor {
	private constructor(
		private input: string,
		private profile: Profile,
		private activeFile: TFile | null,
	) {}

	public static async process(
		input: string,
		profile: Profile,
		activeFile: TFile | null,
	): Promise<string> {
		const instance = new Processor(input, profile, activeFile);
		return await instance.process();
	}

	private async process(): Promise<string> {
		const rendered = await unified()
			.use(remarkParse)
			.use(remarkMath)
			.use(customStringify, { profile: this.profile })
			.process(this.input);

		console.log("OUTPUT:", String(rendered));

		return String(rendered);
	}
}
