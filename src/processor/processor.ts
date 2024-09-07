import { TFile } from "obsidian";
import { Profile } from "src/settings/settings";

export class Processor {
	private constructor(
		private input: string,
		private profile: Profile,
		private activeFile: TFile | null,
	) {}

	public static process(
		input: string,
		profile: Profile,
		activeFile: TFile | null,
	): string {
		const instance = new Processor(input, profile, activeFile);
		return instance.process();
	}

	private process(): string {
		return "";
	}
}
