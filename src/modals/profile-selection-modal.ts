import { App, SuggestModal } from "obsidian";
import AdvancedCopyPlugin from "src/main";
import { Profile } from "src/settings/settings";

export class ProfileSelectionModal extends SuggestModal<Profile> {
    constructor(
        app: App,
        private plugin: AdvancedCopyPlugin,
        private onSelect: (profile: Profile) => void,
    ) {
        super(app);
    }

    // Returns all available suggestions.
    getSuggestions(query: string): Profile[] {
        const profiles = Object.values(this.plugin.settings!.profiles);

        return profiles.filter((profile) =>
            profile.meta.name.toLowerCase().includes(query.toLowerCase()),
        );
    }

    // Renders each suggestion item.
    renderSuggestion(profile: Profile, el: HTMLElement) {
        el.createEl("div", { text: profile.meta.name });
        el.createEl("small", { text: profile.meta.description });
    }

    // Perform action on the selected suggestion.
    async onChooseSuggestion(
        profile: Profile,
        _evt: MouseEvent | KeyboardEvent,
    ) {
        await this.onSelect(profile);
    }
}
