export class App {}
export class Editor {}
export class MarkdownView {}
export class Modal {}
export class Notice {}
export class Plugin {
    public addCommand() {}
    public addRibbonIcon() {
        return { addClass: () => {} };
    }
    public addSettingTab() {}
    public addStatusBarItem() {
        return { setText: () => {} };
    }
    public loadData() {}
    public registerDomEvent() {}
    public registerInterval() {}
}
export class PluginSettingTab {}
export class Setting {}
export class SuggestModal {}
export class TFolder {}
export class Vault {}
export class Workspace {}

export interface MarkdownFileInfo {}

export type IconName = string;
export function setIcon(parent: HTMLElement, iconId: IconName): void {}
