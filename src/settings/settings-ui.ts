import {
    App,
    Modal,
    Notice,
    PluginSettingTab,
    setIcon,
    Setting,
} from "obsidian";
import ConvertAndCopyPlugin from "src/main";
import { Logger } from "src/utils/Logger";
import { Profile, MDTemplate } from "./settings";
import AdvancedCopyPlugin from "src/main";
import { ConfirmationModal } from "../modals/confirmation-modal";
import { InputModal } from "../modals/input-modal";
import { DEFAULT_SETTINGS } from "./default-settings";
import { profileDesc, ProfileDescSetting } from "./profile-desc";

const PLUGIN_ID = "advanced-copy";

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

    /**
     * Save the settings
     */
    private async save(): Promise<void> {
        await this.plugin.saveSettings();
    }

    /**
     * Rerenader the settings ui
     */
    private reload(): void {
        this.display();
    }

    /**
     * Add general plugin settings to the DOM
     */
    private addGeneralSettings(): void {
        if (!this.plugin.settings) {
            return;
        }

        new Setting(this.containerEl)
            .setName("Configure hotkeys")
            .setDesc("Redirect to hotkeys tab")
            .addButton((button) => {
                button
                    .setButtonText("Configure macros")
                    .setIcon("square-asterisk")
                    .setTooltip("Configure macros")
                    .onClick(() => {
                        // @ts-ignore
                        this.app.setting.openTabById("hotkeys");
                        // @ts-ignore
                        const tab = this.app.setting.activeTab;
                        tab.searchComponent.inputEl.value = PLUGIN_ID;
                        tab.updateHotkeyVisibility();
                    });
            });

        new Setting(this.containerEl)
            .setName("Settings")
            .addButton((button) =>
                button
                    .setButtonText("Copy settings")
                    .setTooltip("Copy settings")
                    .onClick(async () => {
                        await navigator.clipboard.writeText(
                            JSON.stringify(this.plugin.settings, null, 2),
                        );
                        new Notice("Settings copied to clipboard");
                    }),
            )
            .addButton((button) =>
                button
                    .setButtonText("Paste settings")
                    .setTooltip("Paste settings")
                    .setWarning()
                    .onClick(async () => {
                        new ConfirmationModal(
                            this.app,
                            "Import settings from clipboard",
                            "This will erase your current settings. Are you sure you want to continue?",
                            async () => {
                                const input =
                                    await navigator.clipboard.readText();
                                try {
                                    const settings = JSON.parse(input);
                                    this.plugin.settings = settings;
                                    await this.save();
                                    this.reload();
                                    new Notice("Settings pasted");
                                } catch (e) {
                                    new Notice("Failed to paste settings");
                                    Logger.error("Failed to paste settings");
                                }
                            },
                        ).open();
                    }),
            )
            .addButton((button) =>
                button
                    .setButtonText("Reset settings")
                    .setTooltip("Reset settings")
                    .setWarning()
                    .onClick(() => {
                        new ConfirmationModal(
                            this.app,
                            "Reset settings",
                            "Are you sure you want to reset the settings?",
                            async () => {
                                this.plugin.settings = JSON.parse(
                                    JSON.stringify(DEFAULT_SETTINGS),
                                );
                                await this.save();
                                this.reload();
                            },
                        ).open();
                    }),
            );
    }

    /**
     * Add overview of all profiles to the DOM
     */
    private addProfileOverview(): void {
        if (!this.plugin.settings) {
            return;
        }

        addHeading(this.containerEl, "Profiles");

        const restartWarning = new Setting(this.containerEl)
            .setName(
                "You probably need to restart Obsidian for changes to take effect.",
            )
            .setClass("advanced-copy-plugin__restart-warning");

        for (const [id, profile] of Object.entries(
            this.plugin.settings.profiles,
        )) {
            new Setting(this.containerEl)
                .setName(profile.meta.name)
                .setDesc(profile.meta.description)
                .addExtraButton((extraButton) => {
                    // Button to toggle if the user wants to add an 'selection' command

                    const refresh = () => {
                        if (profile.meta.cmdSelection) {
                            extraButton.extraSettingsEl.classList.add(
                                "advanced-copy-plugin__green-btn",
                            );
                            extraButton.extraSettingsEl.classList.remove(
                                "advanced-copy-plugin__red-btn",
                            );
                        } else {
                            extraButton.extraSettingsEl.classList.remove(
                                "advanced-copy-plugin__green-btn",
                            );
                            extraButton.extraSettingsEl.classList.add(
                                "advanced-copy-plugin__red-btn",
                            );
                        }

                        extraButton.setTooltip(
                            profile.meta.cmdSelection
                                ? 'Disable "copy selection" command'
                                : 'Enable "copy selection" command',
                        );
                    };
                    refresh();

                    extraButton.setIcon("text-cursor").onClick(async () => {
                        profile.meta.cmdSelection = !profile.meta.cmdSelection;
                        refresh();
                        await this.save();
                        restartWarning.setClass(
                            "advanced-copy-plugin__restart-warning--show",
                        );
                    });
                })
                .addExtraButton((extraButton) => {
                    // Button to toggle if the user wants to add a 'page' command

                    const refresh = () => {
                        if (profile.meta.cmdPage) {
                            extraButton.extraSettingsEl.classList.add(
                                "advanced-copy-plugin__green-btn",
                            );
                            extraButton.extraSettingsEl.classList.remove(
                                "advanced-copy-plugin__red-btn",
                            );
                        } else {
                            extraButton.extraSettingsEl.classList.remove(
                                "advanced-copy-plugin__green-btn",
                            );
                            extraButton.extraSettingsEl.classList.add(
                                "advanced-copy-plugin__red-btn",
                            );
                        }

                        extraButton.setTooltip(
                            profile.meta.cmdPage
                                ? 'Disable "copy page" command'
                                : 'Enable "copy page" command',
                        );
                    };
                    refresh();

                    extraButton.setIcon("file").onClick(async () => {
                        profile.meta.cmdPage = !profile.meta.cmdPage;
                        refresh();
                        await this.save();
                        restartWarning.setClass(
                            "advanced-copy-plugin__restart-warning--show",
                        );
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
                            new InputModal(
                                this.app,
                                "Duplicate profile",
                                "Name",
                                "Duplicate",
                                async (name) => {
                                    const newId = name
                                        .toLowerCase()
                                        .replace(/\s/g, "_");

                                    if (this.plugin.settings!.profiles[newId]) {
                                        new Notice(
                                            `Profile ID '${newId}' already exists`,
                                        );
                                        Logger.log(
                                            `Profile '${newId}' already exists`,
                                        );
                                        return;
                                    }

                                    if (
                                        Object.values(
                                            this.plugin.settings!.profiles,
                                        ).find((p) => p.meta.name === name)
                                    ) {
                                        new Notice(
                                            `Profile name '${name}' already exists`,
                                        );
                                        Logger.log(
                                            `Profile '${name}' already exists`,
                                        );
                                        return;
                                    }

                                    const newProfile = JSON.parse(
                                        JSON.stringify(profile),
                                    ) as Profile;
                                    newProfile.meta.name = name;
                                    this.plugin.settings!.profiles[name] =
                                        newProfile;

                                    Logger.log(
                                        `Duplicated profile '${profile.meta.name}' to '${name}'`,
                                    );

                                    await this.save();

                                    this.reload();
                                },
                            ).open();
                        });
                })
                .addButton((button) => {
                    button
                        .setButtonText("Delete profile")
                        .setIcon("trash")
                        .setTooltip("Delete profile")
                        .setWarning()
                        .onClick(() => {
                            new ConfirmationModal(
                                this.app,
                                "Delete profile",
                                `Are you sure you want to delete the profile '${profile.meta.name}'?`,
                                async () => {
                                    Logger.log(
                                        `Deleted profile '${profile.meta.name}'`,
                                    );
                                    delete this.plugin.settings?.profiles[id];
                                    await this.save();
                                    this.reload();
                                },
                            ).open();
                        });
                });
        }
    }

    private openEditProfileModal(profile: Profile): void {
        new EditProfileModal(this.app, this.plugin, profile).open();
    }
}

/**
 * Modal to edit a single profile
 */
class EditProfileModal extends Modal {
    constructor(
        public app: App,
        private plugin: AdvancedCopyPlugin,
        private profile: Profile,
    ) {
        super(app);
    }

    public onOpen(): void {
        this.fixMissingProperties();
        this.display();
    }

    public onClose(): void {
        this.contentEl.empty();
    }

    private async save(): Promise<void> {
        await this.plugin.saveSettings();
    }

    /**
     * Add missing properties with default values to the profile
     */
    private fixMissingProperties(): void {
        // Iterate through sectionKeys the profile should have
        for (const sectionKey of Object.keys(profileDesc)) {
            if (this.profile[sectionKey as keyof Profile] === undefined) {
                // profile is missing the section entirely

                // @ts-ignore TS disallows {}, but missing properties are added below
                this.profile[sectionKey as keyof Profile] = {};

                Logger.warn(`Created missing section: "${sectionKey}"`);
            }

            // Iterate through settings the profile should have
            for (const settingKey of Object.keys(profileDesc[sectionKey])) {
                if (settingKey.startsWith("_")) {
                    // Skip internal properties
                    continue;
                }

                const currValue = (
                    this.profile[sectionKey as keyof Profile] as any
                )[settingKey];

                if (currValue === undefined) {
                    // profile is missing this setting

                    // initialize the setting with an empty string
                    (this.profile[sectionKey as keyof Profile] as any)[
                        settingKey
                    ] = "";

                    Logger.warn(`Created missing setting: "${settingKey}"`);
                }
            }
        }

        this.save();
    }

    private display(): void {
        this.setTitle(`Edit: ${this.profile.meta.name}`);

        // profileDesc describes each configurable property with
        // the same structure as the profile object
        Object.keys(profileDesc).forEach((sectionKey) => {
            this.addSection(this.contentEl, sectionKey);
        });
    }

    private addSection(containerEl: HTMLElement, sectionKey: string): void {
        const sectionDesc = profileDesc[sectionKey];
        const sectionEl = containerEl.createDiv();

        if (sectionKey !== "") {
            const h = sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1);
            addHeading(sectionEl, h);
        }

        if (sectionDesc.hasOwnProperty("_desc")) {
            const descEl = new Setting(sectionEl).descEl;
            descEl.createSpan({ text: sectionDesc._desc?.desc });
        }

        Object.keys(sectionDesc).forEach((settingKey) => {
            this.addSettingToSection(sectionEl, sectionKey, settingKey);
        });
    }

    private addSettingToSection(
        sectionEl: HTMLElement,
        sectionKey: string,
        settingKey: string,
    ): void {
        const settingDesc: ProfileDescSetting =
            profileDesc[sectionKey][settingKey];

        if (settingDesc !== undefined && settingDesc.visible === false) {
            return;
        }

        const currValue = (this.profile[sectionKey as keyof Profile] as any)[
            settingKey
        ];

        const update = async (value: any) => {
            (this.profile[sectionKey as keyof Profile] as any)[settingKey] =
                value;
            await this.save();
        };

        switch (settingDesc.type) {
            case "string":
                addTextInput(
                    sectionEl,
                    settingDesc.name,
                    settingDesc.desc,
                    currValue,
                    update,
                );
                break;
            case "number":
                throw new Error("Number settings not implemented");
            case "boolean":
                addToggleInput(
                    sectionEl,
                    settingDesc.name,
                    settingDesc.desc,
                    currValue,
                    update,
                );
                break;
            case "template":
                new TemplateSetting(sectionEl, settingDesc, update, currValue);
                break;
            default:
                Logger.error(`Unknown setting type: ${settingDesc.type}`);
        }
    }
}

class TemplateSetting {
    private isOpen = false;
    private setting: Setting;
    private currValue: MDTemplate;
    private contentContainer: HTMLElement;
    private contentElements: HTMLElement[] = [];

    constructor(
        private containerEl: HTMLElement,
        private settingDesc: ProfileDescSetting,
        private update: (value: MDTemplate) => void,
        initialValue: string | MDTemplate,
    ) {
        this.currValue = this.convertLegacyStringTemplate(initialValue);
        this.setting = this.createSetting();
        this.contentContainer = this.createContentContainer();
    }

    private convertLegacyStringTemplate(
        initialValue: string | MDTemplate,
    ): MDTemplate {
        if (typeof initialValue !== "string") return initialValue;

        const template: MDTemplate = {
            template: initialValue,
        };

        if (this.settingDesc.additionalTemplates) {
            for (const key in this.settingDesc.additionalTemplates) {
                // @ts-ignore
                template[key] = "";
            }
        }

        this.update(template);
        return template;
    }

    private createSetting(): Setting {
        const el = new Setting(this.containerEl)
            .setName(this.settingDesc.name)
            .setDesc(this.settingDesc.desc)
            .setClass("advanced-copy-plugin__template-setting")
            .addTextArea((text) =>
                text
                    .setPlaceholder(this.settingDesc.name)
                    .setValue(this.currValue.template)
                    .onChange((value) => {
                        this.currValue.template = value;
                        this.update(this.currValue);
                    }),
            );

        const iconEl = el.settingEl.createEl("span", {
            cls: "advanced-copy-plugin__template-setting__icon",
        });
        setIcon(iconEl, "right-triangle");
        iconEl.addEventListener("click", () => this.toggleVisibility());
        el.settingEl.prepend(iconEl);

        return el;
    }

    private createContentContainer(): HTMLElement {
        return this.containerEl.createDiv({
            cls: "advanced-copy-plugin__content-container",
        });
    }

    public onClose(): void {}

    private toggleVisibility(): void {
        this.isOpen = !this.isOpen;
        this.setting.settingEl.toggleClass(
            "advanced-copy-plugin__template-setting--open",
            this.isOpen,
        );
        this.isOpen ? this.showContent() : this.removeContent();
    }

    private showContent(): void {
        if (!this.settingDesc.additionalTemplates) return;

        for (const key in this.settingDesc.additionalTemplates) {
            const desc = this.settingDesc.additionalTemplates[key];
            if (desc.type != "string") {
                throw new Error(
                    `Additional template type '${desc.type}' not yet supported.`,
                );
            }

            const value = this.currValue[key as keyof MDTemplate] ?? "";

            const el = new Setting(this.contentContainer)
                .setName(desc.name)
                .setDesc(desc.desc)
                .addTextArea((text) =>
                    text
                        .setPlaceholder(desc.name)
                        .setValue(value)
                        .onChange((value: string) => {
                            this.currValue[key as keyof MDTemplate] = value;
                            this.update(this.currValue);
                        }),
                );
            this.contentElements.push(el.settingEl);
        }
    }

    private removeContent(): void {
        this.contentElements.forEach((el) => el.remove());
    }
}

// Helper functions

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
