import { Editor, MarkdownFileInfo, MarkdownView, Plugin } from "obsidian";
import { AdvancedCopyPluginSettings, Profile } from "./settings/settings";
import { DEFAULT_SETTINGS } from "./settings/default-settings";
import { AdvancedCopyPluginSettingsTab } from "./settings/settings-ui";
import { Logger } from "./utils/Logger";
import { ClipboardHelper } from "./utils/ClipboardHelper";
import { GlobalVariables, Processor } from "./processor/processor";
import { ProfileSelectionModal } from "./modals/profile-selection-modal";

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
        const globalVars = this.getGlobalVariables();

        const output = await Processor.process(input, profile, globalVars);

        ClipboardHelper.copy(output);
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
}
