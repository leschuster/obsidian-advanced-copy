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
    ) {
        super(app);
    }

    onOpen() {
        let { contentEl } = this;

        this.setTitle(`Error: ${this.title}`);
        this.titleEl.addClass("mod-warning");

        contentEl.createEl("p", { text: this.message, cls: "mod-warning" });

        new Setting(contentEl)
            .addButton((button) => {
                button
                    .setButtonText(this.primaryButtonText)
                    .setWarning()
                    .onClick(() => {
                        this.onPrimaryButtonClick();
                        this.close();
                    });
            })
            .addButton((button) => {
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
