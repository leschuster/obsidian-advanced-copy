import { App, Modal, Notice, PluginSettingTab, Setting } from "obsidian";
import ConvertAndCopyPlugin from "src/main";
import { Logger } from "src/utils/Logger";
import { Profile, profileDesc } from "./settings";
import AdvancedCopyPlugin from "src/main";
import { ConfirmationModal } from "../modals/confirmation-modal";
import { InputModal } from "../modals/input-modal";

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

    private reload(): void {
        this.display();
    }

    private addGeneralSettings(): void {
        if (!this.plugin.settings) {
            return;
        }

        addHeading(this.containerEl, "General");

        new Setting(this.containerEl)
            .setName("Configure Hotkeys")
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
    }

    private addProfileOverview(): void {
        if (!this.plugin.settings) {
            return;
        }

        addHeading(this.containerEl, "Profiles");

        for (const [id, profile] of Object.entries(
            this.plugin.settings.profiles,
        )) {
            new Setting(this.containerEl)
                .setName(profile.meta.name)
                .setDesc(profile.meta.description)
                .addExtraButton((extraButton) => {
                    // Button to toggle if the user wants to add an 'selection' command

                    const refresh = () => {
                        extraButton.extraSettingsEl.style.backgroundColor =
                            profile.meta.cmdSelection
                                ? "var(--color-green)"
                                : "var(--color-red)";
                        extraButton.extraSettingsEl.style.color = "white";
                        extraButton.setTooltip(
                            profile.meta.cmdSelection
                                ? 'Disable "Copy Selection" command'
                                : 'Enable "Copy Selection" command',
                        );
                    };
                    refresh();

                    extraButton.setIcon("text-cursor").onClick(async () => {
                        profile.meta.cmdSelection = !profile.meta.cmdSelection;
                        refresh();
                        await this.save();
                    });
                })
                .addExtraButton((extraButton) => {
                    // Button to toggle if the user wants to add a 'page' command

                    const refresh = () => {
                        extraButton.extraSettingsEl.style.backgroundColor =
                            profile.meta.cmdPage
                                ? "var(--color-green)"
                                : "var(--color-red)";
                        extraButton.extraSettingsEl.style.color = "white";
                        extraButton.setTooltip(
                            profile.meta.cmdPage
                                ? 'Disable "Copy Page" command'
                                : 'Enable "Copy Page" command',
                        );
                    };
                    refresh();

                    extraButton.setIcon("file").onClick(async () => {
                        profile.meta.cmdPage = !profile.meta.cmdPage;
                        refresh();
                        await this.save();
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

        for (const [sectionKey, section] of Object.entries(profileDesc)) {
            if (sectionKey !== "") {
                const heading =
                    sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1);
                addHeading(this.contentEl, heading);
            }

            for (const [settingKey, setting] of Object.entries(section)) {
                if (setting.visible === false) {
                    continue;
                }

                const name = setting.name;
                const desc = setting.desc;

                const initialValue = (
                    this.profile[sectionKey as keyof Profile] as any
                )[settingKey];

                const update = async (value: any) => {
                    (this.profile[sectionKey as keyof Profile] as any)[
                        settingKey
                    ] = value;
                    await this.save();
                };

                switch (setting.type) {
                    case "string":
                        addTextAreaInput(
                            this.contentEl,
                            name,
                            desc,
                            initialValue as string,
                            update,
                        );
                        break;
                    case "boolean":
                        addToggleInput(
                            this.contentEl,
                            name,
                            desc,
                            initialValue as boolean,
                            update,
                        );
                        break;
                }
            }
        }
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
