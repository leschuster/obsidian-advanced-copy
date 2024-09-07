import { App, Modal, Plugin, Setting } from "obsidian";
import { AdvancedCopyPluginSettings } from "./settings/settings";
import { DEFAULT_SETTINGS } from "./settings/default-settings";

export const PLUGIN_NAME = "Advanced-Copy";

export default class AdvancedCopyPlugin extends Plugin {
	public settings: AdvancedCopyPluginSettings | undefined;

	async onload() {
		await this.loadSettings();

		this.registerCommands();

		// This adds a settings tab so the user can configure various aspects of the plugin
		//this.addSettingTab(new SampleSettingTab(this.app, this));
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

	private registerCommands(): void {}
}
