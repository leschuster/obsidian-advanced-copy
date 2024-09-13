import { App, Modal, PluginSettingTab, Setting } from "obsidian";
import ConvertAndCopyPlugin from "src/main";
import { Logger } from "src/utils/Logger";
import { Profile } from "./settings";
import AdvancedCopyPlugin from "src/main";

/**
 * Provides the settings tab for the user interface
 */
export class AdvancedCopyPluginSettingsTab extends PluginSettingTab {
	constructor(
		public app: App,
		private plugin: ConvertAndCopyPlugin,
	) {
		super(app, plugin);
	}

	public display(): void {
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

	private async save(): Promise<void> {
		await this.plugin.saveSettings();
	}

	private addGeneralSettings(): void {
		if (!this.plugin.settings) {
			return;
		}

		addHeading(this.containerEl, "General");

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
						tab.searchComponent.inputEl.value =
							"obsidian-advanced-copy";
						tab.updateHotkeyVisibility();
					});
			});

		new Setting(this.containerEl)
			.setName("Debug Mode")
			.setDesc("Add additional logging")
			.addToggle((toggle) => {
				if (!this.plugin.settings) {
					return;
				}

				toggle
					.setValue(this.plugin.settings.debug_mode)
					.onChange(async (value) => {
						if (this.plugin.settings) {
							this.plugin.settings.debug_mode = value;
							await this.save();
						}
					});
			});
	}

	private addProfileOverview(): void {
		if (!this.plugin.settings) {
			return;
		}

		addHeading(this.containerEl, "Profiles");

		for (const profile of Object.values(this.plugin.settings.profiles)) {
			new Setting(this.containerEl)
				.setName(profile.meta.name)
				.setDesc(profile.meta.description)
				.addExtraButton((extraButton) => {
					// Button to toggle if the user wants to add an 'selection' command
					extraButton.setIcon("text-cursor").onClick(() => {
						profile.meta.cmdSelection = !profile.meta.cmdSelection;
					});
				})
				.addExtraButton((extraButton) => {
					// Button to toggle if the user wants to add a 'page' command
					extraButton.setIcon("file").onClick(() => {
						profile.meta.cmdPage = !profile.meta.cmdPage;
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
		new EditProfileModal(this.app, this.plugin, profile).open();
	}
}

class EditProfileModal extends Modal {
	constructor(
		public app: App,
		private plugin: AdvancedCopyPlugin,
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
		await this.plugin.saveSettings();
	}

	private buildUI(): void {
		this.setTitle(`Edit: ${this.profile.meta.name}`);

		addHeading(this.contentEl, "Meta");

		addTextInput(
			this.contentEl,
			"Name",
			"Name of the profile",
			this.profile.meta.name,
			async (value) => {
				this.profile.meta.name = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Description",
			"Description of the profile",
			this.profile.meta.description,
			async (value) => {
				this.profile.meta.description = value;
				await this.save();
			},
		);

		addToggleInput(
			this.contentEl,
			"Command - Selection",
			"Add a command to copy the selected text",
			this.profile.meta.cmdSelection,
			async (value) => {
				this.profile.meta.cmdSelection = value;
				await this.save();
			},
		);

		addToggleInput(
			this.contentEl,
			"Command - Page",
			"Add a command to copy the entire page",
			this.profile.meta.cmdPage,
			async (value) => {
				this.profile.meta.cmdPage = value;
				await this.save();
			},
		);

		addHeading(this.contentEl, "Templates");

		this.contentEl.createEl("div", {
			text: "In the following section, you can define how Obsidian's Markdown elements will be converted. For each element, you need to provide a template. You have access to both global and element-specific variables. For example, $value will be replaced by the raw text or the element's converted children.",
		});

		this.contentEl.createEl("div", {
			text: "Global variables: $fileBasename, $fileExtension, $fileName, $filePath, $date, $time",
		});

		addTextAreaInput(
			this.contentEl,
			"Blockquote Line",
			"Define how a single line of a blockquote should be converted.\nVariables: $value",
			this.profile.templates.blockquoteLine,
			async (value) => {
				this.profile.templates.blockquoteLine = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Blockquote Wrapper",
			"Define how a blockquote as a whole should be converted.\nVariables: $value",
			this.profile.templates.blockquoteWrapper,
			async (value) => {
				this.profile.templates.blockquoteWrapper = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Bold",
			"Define the format for bold text.\nVariables: $value",
			this.profile.templates.bold,
			async (value) => {
				this.profile.templates.bold = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Code Block",
			"Define how a code block should be converted.\nVariables: $value, $lang, $meta",
			this.profile.templates.codeBlock,
			async (value) => {
				this.profile.templates.codeBlock = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Code Inline",
			"Define how inline code should be converted.\nVariables: $value",
			this.profile.templates.codeInline,
			async (value) => {
				this.profile.templates.codeInline = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Heading 1",
			"Define how a level 1 heading should be converted.\nVariables: $value, $level",
			this.profile.templates.heading1,
			async (value) => {
				this.profile.templates.heading1 = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Heading 2",
			"Define how a level 2 heading should be converted.\nVariables: $value, $level",
			this.profile.templates.heading2,
			async (value) => {
				this.profile.templates.heading2 = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Heading 3",
			"Define how a level 3 heading should be converted.\nVariables: $value, $level",
			this.profile.templates.heading3,
			async (value) => {
				this.profile.templates.heading3 = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Heading 4",
			"Define how a level 4 heading should be converted.\nVariables: $value, $level",
			this.profile.templates.heading4,
			async (value) => {
				this.profile.templates.heading4 = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Heading 5",
			"Define how a level 5 heading should be converted.\nVariables: $value, $level",
			this.profile.templates.heading5,
			async (value) => {
				this.profile.templates.heading5 = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Heading 6",
			"Define how a level 6 heading should be converted.\nVariables: $value, $level",
			this.profile.templates.heading6,
			async (value) => {
				this.profile.templates.heading6 = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Horizontal Rule",
			"Define how a horizontal rule should be converted.",
			this.profile.templates.horizontalRule,
			async (value) => {
				this.profile.templates.horizontalRule = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Image",
			"Define how an image should be converted.\nVariables: $url, $title, $alt",
			this.profile.templates.image,
			async (value) => {
				this.profile.templates.image = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Italic",
			"Define how italic text should be converted.\nVariables: $value",
			this.profile.templates.italic,
			async (value) => {
				this.profile.templates.italic = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Line Break",
			"Define how a line break should be converted.",
			this.profile.templates.lineBreak,
			async (value) => {
				this.profile.templates.lineBreak = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Link",
			"Define how a link should be converted.\nVariables: $url, $alt, $title",
			this.profile.templates.link,
			async (value) => {
				this.profile.templates.link = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"List Item",
			"Define how a list item should be converted.\nVariables: $value",
			this.profile.templates.listItem,
			async (value) => {
				this.profile.templates.listItem = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Math Block",
			"Define how a math block should be converted.\nVariables: $value, $meta",
			this.profile.templates.mathBlock,
			async (value) => {
				this.profile.templates.mathBlock = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Math Inline",
			"Define how inline math should be converted.\nVariables: $value",
			this.profile.templates.mathInline,
			async (value) => {
				this.profile.templates.mathInline = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Ordered List",
			"Define how an ordered list should be converted.\nVariables: $value, $start",
			this.profile.templates.orderedList,
			async (value) => {
				this.profile.templates.orderedList = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Paragraph",
			"Define how a paragraph should be converted.\nVariables: $value",
			this.profile.templates.paragraph,
			async (value) => {
				this.profile.templates.paragraph = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Text",
			"Define how text should be converted.\nVariables: $value",
			this.profile.templates.text,
			async (value) => {
				this.profile.templates.text = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"Unordered List",
			"Define how an unordered list should be converted.\nVariables: $value",
			this.profile.templates.unorderedList,
			async (value) => {
				this.profile.templates.unorderedList = value;
				await this.save();
			},
		);

		addHeading(this.contentEl, "Extra");

		addTextAreaInput(
			this.contentEl,
			"Before",
			"What you put in here will be placed at the beginning of the output. You can use all global variables from the above.",
			this.profile.extra.before,
			async (value) => {
				this.profile.extra.before = value;
				await this.save();
			},
		);

		addTextAreaInput(
			this.contentEl,
			"After",
			"What you put in here will be placed at the end of the output. You can use all global variables from the above.",
			this.profile.extra.after,
			async (value) => {
				this.profile.extra.after = value;
				await this.save();
			},
		);
	}
}

function addHeading(containerEl: HTMLElement, name: string): void {
	new Setting(containerEl).setName(name).setHeading();
}

function addTextInput(
	containerEl: HTMLElement,
	name: string,
	desc: string,
	value: string,
	update: (value: string) => void,
): void {
	new Setting(containerEl)
		.setName(name)
		.setDesc(desc)
		.addText((text) =>
			text.setPlaceholder(name).setValue(value).onChange(update),
		);
}

function addTextAreaInput(
	containerEl: HTMLElement,
	name: string,
	desc: string,
	value: string,
	update: (value: string) => void,
): void {
	new Setting(containerEl)
		.setName(name)
		.setDesc(desc)
		.addTextArea((text) =>
			text.setPlaceholder(name).setValue(value).onChange(update),
		);
}

function addToggleInput(
	containerEl: HTMLElement,
	name: string,
	desc: string,
	value: boolean,
	update: (value: boolean) => void,
): void {
	new Setting(containerEl)
		.setName(name)
		.setDesc(desc)
		.addToggle((toggle) => toggle.setValue(value).onChange(update));
}
