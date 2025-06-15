import { Editor, MarkdownFileInfo, MarkdownView, Plugin } from "obsidian";
import { AdvancedCopyPluginSettings, Profile } from "./settings/settings";
import { DEFAULT_SETTINGS } from "./settings/default-settings";
import { AdvancedCopyPluginSettingsTab } from "./settings/settings-ui";
import { Logger } from "./utils/Logger";
import { ClipboardHelper } from "./utils/ClipboardHelper";
import { GlobalVariables, Processor } from "./processor/processor";
import { ProfileSelectionModal } from "./modals/profile-selection-modal";
import { ErrorModal } from "./modals/error-modal";
import { profileDesc } from "./settings/profile-desc";
import { isEquivalent } from "./utils/isEquivalent";

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
        this.settings = structuredClone(DEFAULT_SETTINGS);

        const customSettings = await this.loadData();
        if (customSettings) {
            this.settings = customSettings;
        }
    }

    /**
     * Save user settings
     */
    public async saveSettings(): Promise<void> {
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

        this.registerMainCmds();

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

    private registerMainCmds(): void {
        this.addCommand({
            id: `copy-selection`,
            name: "Copy selection",
            editorCallback: (
                editor: Editor,
                _: MarkdownView | MarkdownFileInfo,
            ) => {
                new ProfileSelectionModal(this.app, this, async (profile) => {
                    this.copy(editor.getSelection(), profile);
                }).open();
            },
        });

        this.addCommand({
            id: `copy-page`,
            name: "Copy page",
            editorCallback: (
                editor: Editor,
                _: MarkdownView | MarkdownFileInfo,
            ) => {
                new ProfileSelectionModal(this.app, this, async (profile) => {
                    this.copy(editor.getValue(), profile);
                }).open();
            },
        });
    }

    /**
     * Register command to copy the current selection for given profile
     * @param profile
     */
    private registerCmdToCopySelection(profile: Profile): void {
        this.addCommand({
            id: `copy-profile-${profile.meta.id}-selection`,
            name: `${profile.meta.name}: selection`,
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
            id: `copy-profile-${profile.meta.id}-page`,
            name: `${profile.meta.name}: page`,
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
        if (this.profileIsIncomplete(profile)) return;
        this.checkProfileUpdate(profile);

        const globalVars = this.getGlobalVariables();

        const output = await Processor.process(input, profile, globalVars);

        ClipboardHelper.copy(output);
    }

    private checkProfileUpdate(profile: Profile): void {
        if (profile.meta.doNotUpdate) {
            return;
        }
        if (!DEFAULT_SETTINGS.profiles.hasOwnProperty(profile.meta.id)) {
            return;
        }

        const defaultProfile = DEFAULT_SETTINGS.profiles[profile.meta.id];

        let changed = false;
        for (const [sectionKey, section] of Object.entries(defaultProfile)) {
            if (sectionKey === "meta") continue;

            if (!isEquivalent(section, (profile as any)[sectionKey])) {
                changed = true;
                break;
            }
        }

        if (!changed) {
            return;
        }

        new ErrorModal(
            this.app,
            "Profile Update Detected",
            `The profile "${profile.meta.name}" has changes compared to the default settings. This could be due to remote updates or local modifications. Would you like to apply the default settings or retain your current configuration?`,
            "Apply Default",
            async () => {
                const { meta } = profile;
                this.settings!.profiles[profile.meta.id] =
                    structuredClone(defaultProfile);
                this.settings!.profiles[profile.meta.id].meta = meta;
                await this.saveSettings();
            },
            "Keep Current",
            async () => {
                profile.meta.doNotUpdate = true;
                await this.saveSettings();
            },
        ).open();
    }

    private getGlobalVariables(): GlobalVariables {
        const date = new Date();
        const activeFile = this.app.workspace.getActiveFile();
        const vaultName = this.app.vault.getName();

        return {
            vaultName,
            fileBasename: activeFile?.basename ?? "",
            fileExtension: activeFile?.extension ?? "",
            fileName: activeFile?.name ?? "",
            filePath: activeFile?.path ?? "",
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
        };
    }

    /**
     * Check if the profile is incomplete and show an error modal if it is
     * @param profile profile to check
     * @returns boolean indicating if the profile is incomplete
     */
    private profileIsIncomplete(profile: any): profile is Profile {
        // Use profileDesc as reference for required sections and properties
        const schema = profileDesc;

        const missingSections = Object.keys(schema).filter(
            (key) => profile[key] === undefined,
        );

        if (missingSections.length > 0) {
            const err = `Profile is missing these sections: ${missingSections.join(", ")}. Open the profiles settings and the sections will be created automatically.`;

            Logger.error(err);

            new ErrorModal(
                this.app,
                "Profile incomplete",
                err,
                "Complete Profile",
                () => {
                    // Redirect to settings tab
                    // Opening the profile will create missing sections and properties

                    // @ts-ignore
                    this.app.setting.open();
                    // @ts-ignore
                    this.app.setting.openTabById("advanced-copy");
                },
            ).open();

            return true;
        }

        const missingProperties = Object.keys(schema)
            .map((section) =>
                Object.keys(schema[section as keyof Profile])
                    .filter((key) => !schema[section][key].optional)
                    .filter((key) => profile[section][key] === undefined)
                    .filter((key) => !key.startsWith("_")) // Ignore internal properties
                    .map((key) => `${section}.${key}`),
            )
            .flat();

        if (missingProperties.length > 0) {
            const err = `Profile is missing these properties: ${missingProperties.join(", ")}. Open the profiles settings and the properties will be created automatically.`;

            Logger.error(err);

            new ErrorModal(
                this.app,
                "Error: Profile incomplete",
                err,
                "Complete Profile",
                () => {
                    // Redirect to settings tab
                    // Opening the profile will create missing and properties

                    // @ts-ignore
                    this.app.setting.open();
                    // @ts-ignore
                    this.app.setting.openTabById("advanced-copy");
                },
            ).open();

            return true;
        }

        return false;
    }
}
