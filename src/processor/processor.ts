import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { Profile } from "src/settings/settings";
import { unified } from "unified";
import customStringify from "./customStringify";
import remarkGfm from "remark-gfm";
import remarkCallout from "./remark-plugins/remark-callout";
import remarkWikilink from "./remark-plugins/wikilink";
import remarkGemoji from "remark-gemoji";
import remarkHighlight from "./remark-plugins/highlight";
import { modifiers } from "./modifiers";

/**
 * Global variables that the user can use anywhere in any profile
 */
export type GlobalVariables = {
    vaultName: string;
    fileBasename: string;
    fileExtension: string;
    fileName: string;
    filePath: string;
    date: string;
    time: string;
};

export class Processor {
    private constructor(
        private profile: Profile,
        private globalVars: GlobalVariables,
    ) {}

    public static async process(
        input: string,
        profile: Profile,
        globalVars: GlobalVariables,
    ): Promise<string> {
        const instance = new Processor(profile, globalVars);

        const preprocessed = instance.preprocess(input);
        const processed = await instance.process(preprocessed);
        const postprocessed = instance.postprocess(processed);

        return postprocessed;
    }

    private preprocess(input: string): string {
        // Standardize line endings
        return input.replace(/\r\n|\r/g, "\n");
    }

    private async process(input: string): Promise<string> {
        let processor = unified()
            .use(remarkParse)
            .use(remarkMath)
            .use(remarkGfm)
            .use(remarkCallout)
            .use(remarkWikilink)
            .use(remarkHighlight);

        if (this.profile.meta.replaceGemojiShortcodes) {
            processor = processor.use(remarkGemoji);
        }

        const content = await processor
            .use(customStringify, { profile: this.profile })
            .process(input);

        const rendered =
            this.profile.extra.before +
            String(content) +
            this.profile.extra.after;

        return rendered;
    }

    private postprocess(input: string): string {
        input = this.replaceGlobalVariables(input);
        input = this.applyModifiers(input);
        return input;
    }

    private replaceGlobalVariables(text: string): string {
        for (const [key, value] of Object.entries(this.globalVars)) {
            text = text.replaceAll(`\$${key}`, value);
        }

        return text;
    }

    private applyModifiers(text: string): string {
        return text.replace(
            /\$(\w+)\{([^}]+)\}/gm,
            (match, modifier, value) => {
                const modifierFunc = modifiers[modifier];
                if (modifierFunc) {
                    return modifierFunc(value);
                }
                return match;
            },
        );
    }
}
