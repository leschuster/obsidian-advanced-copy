import {
	App,
	Editor,
	MarkdownFileInfo,
	MarkdownView,
	Modal,
	Plugin,
	Setting,
} from "obsidian";
import { AdvancedCopyPluginSettings, Profile } from "./settings/settings";
import { DEFAULT_SETTINGS } from "./settings/default-settings";
import { AdvancedCopyPluginSettingsTab } from "./settings/settings-ui";
import { Logger } from "./utils/Logger";
import { ClipboardHelper } from "./utils/ClipboardHelper";
import { Processor } from "./processor/processor";

export const PLUGIN_NAME = "Advanced-Copy";

export default class AdvancedCopyPlugin extends Plugin {
	public settings: AdvancedCopyPluginSettings | undefined;

	async onload() {
		await this.loadSettings();

		this.registerCommands();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new AdvancedCopyPluginSettingsTab(this.app, this));
	}

	public onunload(): void {}

	public async loadSettings(): Promise<void> {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData(),
		);
	}

	public async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}

	private registerCommands(): void {
		if (!this.settings) {
			Logger.error("Could not register commands: Settings not loaded");
			return;
		}

		for (const profile of Object.values(this.settings.profiles)) {
			console.log(profile);
			if (profile.cmd_selection) {
				this.createCmdToCopySelection(profile);
			}

			if (profile.code_block) {
				this.createCmdToCopyPage(profile);
			}
		}
	}

	private createCmdToCopySelection(profile: Profile): void {
		this.addCommand({
			id: `${PLUGIN_NAME}-Profile-${profile.id}-Copy-Selection`,
			name: `${profile.name}: Selection`,
			editorCallback: (
				editor: Editor,
				ctx: MarkdownView | MarkdownFileInfo,
			) => {
				this.copy(editor.getSelection(), profile);
			},
		});
	}

	private createCmdToCopyPage(profile: Profile): void {
		this.addCommand({
			id: `${PLUGIN_NAME}-Profile-${profile.id}-Copy-Page`,
			name: `${profile.name}: Page`,
			editorCallback: (
				editor: Editor,
				ctx: MarkdownView | MarkdownFileInfo,
			) => {
				this.copy(editor.getValue(), profile);
			},
		});
	}

	private copy(input: string, profile: Profile): void {
		const activeFile = this.app.workspace.getActiveFile();

		const output = Processor.process(input, profile, activeFile);

		ClipboardHelper.copy(output);
	}
}
