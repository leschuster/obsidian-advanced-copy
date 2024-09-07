import { Notice } from "obsidian";
import { Logger } from "./Logger";

export class ClipboardHelper {
	public static async copy(text: string): Promise<void> {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				new Notice("Text copied to clipboard");
			})
			.catch((err) => {
				Logger.error("Could not write to clipboard: " + err);
			});
	}
}
