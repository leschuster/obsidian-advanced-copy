import { TFile } from "obsidian";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { Profile } from "src/settings/settings";
import { unified } from "unified";
import customStringify from "./customStringify";

export class Processor {
	private constructor(
		private profile: Profile,
		private activeFile: TFile | null,
	) {}

	public static async process(
		input: string,
		profile: Profile,
		activeFile: TFile | null,
	): Promise<string> {
		const instance = new Processor(profile, activeFile);

		const preprocessed = instance.preprocess(input);
		const processed = await instance.process(preprocessed);
		const postprocessed = instance.postprocess(processed);

		console.log("OUTPUT:", postprocessed);

		return postprocessed;
	}

	private preprocess(input: string): string {
		// Standardize line endings
		return input.replace(/\r\n|\r/g, "\n");
	}

	private async process(input: string): Promise<string> {
		const content = await unified()
			.use(remarkParse)
			.use(remarkMath)
			.use(customStringify, { profile: this.profile })
			.process(input);

		const rendered =
			this.profile.extra.before +
			String(content) +
			this.profile.extra.after;

		return rendered;
	}

	private postprocess(input: string): string {
		return this.replaceGlobalVariables(input);
	}

	private replaceGlobalVariables(text: string): string {
		const date = new Date();

		const globalVariables: { [key: string]: string } = {
			fileBasename: this.activeFile?.basename ?? "",
			fileExtension: this.activeFile?.extension ?? "",
			fileName: this.activeFile?.name ?? "",
			filePath: this.activeFile?.path ?? "",
			date: date.toLocaleDateString(),
			time: date.toLocaleTimeString(),
		};

		for (const key in globalVariables) {
			text = text.replaceAll(`\$${key}`, globalVariables[key]);
		}

		return text;
	}
}
