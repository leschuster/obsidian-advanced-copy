import { App, Modal, Setting } from "obsidian";

/**
 * Error modal that displays an error message to the user
 */
export class ErrorModal extends Modal {
    constructor(
        app: App,
        private title: string,
        private message: string,
        private primaryButtonText: string,
        private onPrimaryButtonClick: () => void,
        private secondaryButtonText?: string,
        private onSecondaryButtonClick?: () => void,
    ) {
        super(app);
    }

    onOpen() {
        let { contentEl } = this;

        this.setTitle(`${this.title}`);
        this.titleEl.addClass("mod-warning");

        contentEl.createEl("p", { text: this.message });

        const setting = new Setting(contentEl).addButton((button) => {
            button
                .setButtonText(this.primaryButtonText)
                .setWarning()
                .onClick(() => {
                    this.onPrimaryButtonClick();
                    this.close();
                });
        });

        if (this.secondaryButtonText && this.onSecondaryButtonClick) {
            setting.addButton((button) => {
                button.setButtonText(this.secondaryButtonText!).onClick(() => {
                    this.onSecondaryButtonClick!();
                    this.close();
                });
            });
        }

        setting.addButton((button) => {
            button.setButtonText("Cancel").onClick(() => {
                this.close();
            });
        });
    }

    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}
