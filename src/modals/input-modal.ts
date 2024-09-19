import { App, Modal, Setting } from "obsidian";

export class InputModal extends Modal {
    private result: string;

    constructor(
        app: App,
        private title: string,
        private placeholder: string,
        private cta: string,
        private onConfirm: (result: string) => void,
    ) {
        super(app);
        this.result = "";
    }

    onOpen() {
        let { contentEl } = this;

        this.result = "";

        this.setTitle(this.title);

        new Setting(contentEl).setName(this.placeholder).addText((text) =>
            text.onChange((value) => {
                this.result = value;
            }),
        );

        new Setting(contentEl)
            .addButton((button) => {
                button
                    .setButtonText(this.cta)
                    .setCta()
                    .onClick(() => {
                        this.onConfirm(this.result);
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
