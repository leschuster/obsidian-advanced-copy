import { App, Modal, PluginSettingTab, Setting } from "obsidian";
import ConvertAndCopyPlugin from "src/main";
import { Logger } from "src/utils/Logger";
import { Profile } from "./settings";

export class AdvancedCopyPluginSettingsTab extends PluginSettingTab {
	constructor(
		public app: App,
		public plugin: ConvertAndCopyPlugin,
	) {
		super(app, plugin);
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		if (!this.plugin.settings) {
			new Setting(this.containerEl).setName(
				"Error: Could not load settings",
			);
			return;
		}

		this.addGeneralSettings();
		this.addProfileOverview();
	}

	private save(): void {
		this.plugin.saveSettings();
	}

	private addGeneralSettings(): void {
		if (!this.plugin.settings) {
			return;
		}

		new Setting(this.containerEl).setName("General").setHeading();

		new Setting(this.containerEl)
			.setName("Configure Macros")
			.setDesc("Redirect to Hotkeys tab")
			.addButton((button) => {
				button
					.setButtonText("Configure Macros")
					.setIcon("square-asterisk")
					.setTooltip("Configure Macros")
					.onClick(() => {
						// @ts-ignore
						this.app.setting.openTabById("hotkeys");
						// @ts-ignore
						const tab = this.app.setting.activeTab;
						console.log(tab);
						tab.searchComponent.inputEl.value = "Convert and Copy:";
						tab.updateHotkeyVisibility();
					});
			});

		new Setting(this.containerEl)
			.setName("Debug Mode")
			.setDesc("Add additional logging")
			.addToggle((toggle) => {
				/*
				toggle
					.setValue(this.settings.debug_mode)
					.onChange(async (value) => {
						this.settings.debug_mode = value;
						await this.save();
					}),
					*/
			});
	}

	private addProfileOverview(): void {
		if (!this.plugin.settings) {
			return;
		}

		new Setting(this.containerEl).setName("Profiles").setHeading();

		for (const profile of Object.values(this.plugin.settings.profiles)) {
			new Setting(this.containerEl)
				.setName(profile.name)
				.setDesc(profile.description)
				.addExtraButton((extraButton) => {
					// Button to toggle if the user wants to add an 'selection' command
					extraButton.setIcon("text-cursor").onClick(() => {
						profile.cmd_selection = !profile.cmd_selection;
					});
				})
				.addExtraButton((extraButton) => {
					// Button to toggle if the user wants to add a 'page' command
					extraButton.setIcon("file").onClick(() => {
						profile.cmd_page = !profile.cmd_page;
					});
				})
				.addButton((button) => {
					button
						.setButtonText("Modify profile")
						.setIcon("settings-2")
						.setTooltip("Modify profile")
						.onClick(() => this.openEditProfileModal(profile));
				})
				.addButton((button) => {
					button
						.setButtonText("Duplicate profile")
						.setIcon("copy-plus")
						.setTooltip("Duplicate profile")
						.onClick(() => {
							Logger.warn("Not yet implemented");
						});
				})
				.addButton((button) => {
					button
						.setButtonText("Delete profile")
						.setIcon("trash")
						.setTooltip("Delete profile")
						.setWarning()
						.onClick(() => {
							Logger.warn("Not yet implemented");
						});
				});
		}
	}

	private openEditProfileModal(profile: Profile): void {
		new EditProfileModal(this.app, profile).open();
	}
}

class EditProfileModal extends Modal {
	constructor(
		app: App,
		private profile: Profile,
	) {
		super(app);
	}

	public onOpen(): void {
		this.buildUI();
	}

	public onClose(): void {
		this.contentEl.empty();
	}

	private async save(): Promise<void> {
		// TODO
	}

	private buildUI(): void {
		this.setTitle(`Edit: ${this.profile.name}`);

		this.addHeading("General");

		this.addTextInput(
			"Name",
			"Name of the profile",
			this.profile.name,
			(value) => (this.profile.name = value),
		);

		this.addTextAreaInput(
			"Description",
			"Description of the profile",
			this.profile.description,
			(value) => (this.profile.description = value),
		);

		this.addToggleInput(
			"Command - Selection",
			"Add a command to copy the selected text",
			this.profile.cmd_selection,
			(value) => (this.profile.cmd_selection = value),
		);

		this.addToggleInput(
			"Command - Page",
			"Add a command to copy the entire page",
			this.profile.cmd_page,
			(value) => (this.profile.cmd_page = value),
		);

		this.addHeading("Replacement Options");

		this.contentEl.createSpan({
			text: "The following options specify how the Markdown element should be replaced.\n\nAdditionally, you have access to the following variables:\n$raw - insert raw Markdown\n$title - page title\n$link - page link",
		});

		this.addTextAreaInput(
			"Before",
			"Insert additional text before the actual content",
			this.profile.before,
			(value) => (this.profile.before = value),
		);

		this.addTextAreaInput(
			"After",
			"Insert additional text after the actual content",
			this.profile.after,
			(value) => (this.profile.after = value),
		);

		this.addTextInput(
			"Normal Text",
			"$0 Content",
			this.profile.text,
			(value) => (this.profile.text = value),
		);

		this.addTextInput(
			"Bold Text",
			"$0 Content",
			this.profile.bold,
			(value) => (this.profile.bold = value),
		);

		this.addTextInput(
			"Italic Text",
			"$0 Content",
			this.profile.italic,
			(value) => (this.profile.italic = value),
		);

		this.addTextInput(
			"Inline Math",
			"$0 Content",
			this.profile.inline_math,
			(value) => (this.profile.inline_math = value),
		);

		this.addTextInput(
			"Wikilink",
			"$0 Link - $1 Display text",
			this.profile.wikilink,
			(value) => (this.profile.wikilink = value),
		);

		this.addTextInput(
			"Empty Line",
			"Replace an empty line with something other than a linke break.",
			this.profile.empty_line,
			(value) => (this.profile.empty_line = value),
		);

		this.addTextInput(
			"Paragraph",
			"$0 Content",
			this.profile.paragraph,
			(value) => (this.profile.paragraph = value),
		);

		this.addTextInput(
			"Heading",
			"$0 Content - $1 Level",
			this.profile.heading,
			(value) => (this.profile.heading = value),
		);

		this.addTextInput(
			"Math Block",
			"$0 Content",
			this.profile.math_block,
			(value) => (this.profile.math_block = value),
		);

		this.addTextInput(
			"Code Block",
			"$0 Content - $1 Language (if specified)",
			this.profile.code_block,
			(value) => (this.profile.code_block = value),
		);
	}

	private addHeading(name: string): void {
		new Setting(this.contentEl).setName(name).setHeading();
	}

	private addTextInput(
		name: string,
		desc: string,
		value: string,
		update: (value: string) => void,
	): void {
		new Setting(this.contentEl)
			.setName(name)
			.setDesc(desc)
			.addText((text) =>
				text
					.setPlaceholder(name)
					.setValue(value)
					.onChange(async (value) => {
						update(value);
						await this.save();
					}),
			);
	}

	private addTextAreaInput(
		name: string,
		desc: string,
		value: string,
		update: (value: string) => void,
	): void {
		new Setting(this.contentEl)
			.setName(name)
			.setDesc(desc)
			.addTextArea((text) =>
				text
					.setPlaceholder(name)
					.setValue(value)
					.onChange(async (value) => {
						update(value);
						await this.save();
					}),
			);
	}

	private addToggleInput(
		name: string,
		desc: string,
		value: boolean,
		update: (value: boolean) => void,
	): void {
		new Setting(this.contentEl)
			.setName(name)
			.setDesc(desc)
			.addToggle((toggle) =>
				toggle.setValue(value).onChange(async (value) => {
					update(value);
					await this.save();
				}),
			);
	}
}
