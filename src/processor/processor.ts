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
import { applyModifiers } from "./utils/applyModifiers";
import he from "he";
import remarkEncodeHTMLEntities from "./remark-plugins/encode-html-entities";

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
        input = input.replace(/\r\n|\r/g, "\n");

        // console.log("Preprocessing input:", input);

        // if (this.profile.meta.decodeHTMLEntities === true) {
        //     // This must be first to handle cases where both
        //     // encoded and decoded entities exist in the text.
        //     // By enabling both decodeHTMLEntities and encodeHTMLEntities, all encoded entities
        //     // are decoded first, then everything is encoded again.
        //     // Otherwise, the `&` character of the already encoded entity will be
        //     // encoded again which may not be the desired behavior.
        //     input = he.decode(input);
        // }
        // if (this.profile.meta.encodeHTMLEntities === true) {
        //     input = he.encode(input, { useNamedReferences: true });
        // }
        // if (this.profile.meta.encodeHTMLEntitiesHexOnly === true) {
        //     input = he.encode(input, { useNamedReferences: false });
        // }

        // console.log("Preprocessed input 2:", input);

        return input;
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
        if (this.profile.meta.encodeHTMLEntities) {
            processor = processor.use(remarkEncodeHTMLEntities, {
                useNamedReferences: true,
            });
        }
        if (
            !this.profile.meta.encodeHTMLEntities &&
            this.profile.meta.encodeHTMLEntitiesHexOnly
        ) {
            processor = processor.use(remarkEncodeHTMLEntities, {
                useNamedReferences: false,
            });
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
        input = applyModifiers(input);
        return input;
    }

    private replaceGlobalVariables(text: string): string {
        for (const [key, value] of Object.entries(this.globalVars)) {
            text = text.replaceAll(`\$${key}`, value);
        }
        return text;
    }
}
