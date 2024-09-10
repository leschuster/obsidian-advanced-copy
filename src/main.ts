import { Editor, MarkdownFileInfo, MarkdownView, Plugin } from "obsidian";
import { AdvancedCopyPluginSettings, Profile } from "./settings/settings";
import { DEFAULT_SETTINGS } from "./settings/default-settings";
import { AdvancedCopyPluginSettingsTab } from "./settings/settings-ui";
import { Logger } from "./utils/Logger";
import { ClipboardHelper } from "./utils/ClipboardHelper";
import { Processor } from "./processor/processor";

export const PLUGIN_NAME = "Advanced-Copy";

export default class AdvancedCopyPlugin extends Plugin {
	public settings: AdvancedCopyPluginSettings | undefined;

	/**
	 * Plugin lifecycle hook that gets executed when the Plugin is loaded
	 */
	public async onload() {
		await this.loadSettings();

		this.registerCommands();

		this.addSettingTab(new AdvancedCopyPluginSettingsTab(this.app, this));
	}

	/**
	 * Plugin lifecycle hook that gets executed when the Plugin is unloaded
	 */
	public onunload(): void {}

	/**
	 * Load user settings
	 */
	public async loadSettings(): Promise<void> {
		// TODO: DEEP COPY
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData(),
		);
	}

	/**
	 * Save user settings
	 */
	public async saveSettings(): Promise<void> {
		console.log("SAVING", this.settings);
		await this.saveData(this.settings);
	}

	/**
	 * Register commands for each profile
	 */
	private registerCommands(): void {
		if (!this.settings) {
			Logger.error("Could not register commands: Settings not loaded");
			return;
		}

		// Add commands for each profile individually
		for (const profile of Object.values(this.settings.profiles)) {
			if (profile.meta.cmdSelection) {
				this.registerCmdToCopySelection(profile);
			}

			if (profile.meta.cmdPage) {
				this.registerCmdToCopyPage(profile);
			}
		}
	}

	/**
	 * Register command to copy the current selection for given profile
	 * @param profile
	 */
	private registerCmdToCopySelection(profile: Profile): void {
		this.addCommand({
			id: `${PLUGIN_NAME}-Profile-${profile.meta.id}-Copy-Selection`,
			name: `${profile.meta.name}: Selection`,
			editorCallback: (
				editor: Editor,
				_: MarkdownView | MarkdownFileInfo,
			) => {
				this.copy(editor.getSelection(), profile);
			},
		});
	}

	/**
	 * Register command to copy the entire page for given profile
	 * @param profile
	 */
	private registerCmdToCopyPage(profile: Profile): void {
		this.addCommand({
			id: `${PLUGIN_NAME}-Profile-${profile.meta.id}-Copy-Page`,
			name: `${profile.meta.name}: Page`,
			editorCallback: (
				editor: Editor,
				_: MarkdownView | MarkdownFileInfo,
			) => {
				this.copy(editor.getValue(), profile);
			},
		});
	}

	/**
	 * Perform advanced copy of input, using given profile
	 * @param input text to copy
	 * @param profile profile to use
	 */
	private async copy(input: string, profile: Profile): Promise<void> {
		// We need a reference to the current file to get some global variables
		const activeFile = this.app.workspace.getActiveFile();

		const output = await Processor.process(input, profile, activeFile);

		ClipboardHelper.copy(output);
	}
}
