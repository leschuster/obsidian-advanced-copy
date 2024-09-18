import { App, Modal, Setting } from "obsidian";

export class ConfirmationModal extends Modal {
	constructor(
		app: App,
		private title: string,
		private message: string,
		private onConfirm: () => void,
	) {
		super(app);
	}

	onOpen() {
		let { contentEl } = this;

		this.setTitle(this.title);

		contentEl.createEl("p", { text: this.message, cls: "mod-warning" });

		new Setting(contentEl)
			.addButton((button) => {
				button
					.setButtonText("Delete")
					.setWarning()
					.onClick(() => {
						this.onConfirm();
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
