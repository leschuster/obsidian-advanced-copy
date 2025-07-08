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
import remarkEncodeHTMLEntities from "./remark-plugins/encode-html-entities";
import { FrontmatterVariables, GlobalVariables } from "./types";

export class Processor {
    private constructor(
        private profile: Profile,
        private globalVars: GlobalVariables,
        private frontmatterVars: FrontmatterVariables,
    ) {}

    public static async process(
        input: string,
        profile: Profile,
        globalVars: GlobalVariables,
        frontmatterVars: FrontmatterVariables,
    ): Promise<string> {
        const instance = new Processor(profile, globalVars, frontmatterVars);

        const preprocessed = instance.preprocess(input);
        const processed = await instance.process(preprocessed);
        const postprocessed = instance.postprocess(processed);

        return postprocessed;
    }

    private preprocess(input: string): string {
        // Standardize line endings
        let text = input.replace(/\r\n|\r/g, "\n");

        // Ignore Markdown comments
        text = text.replaceAll(/%%.*%%/gm, "");

        // Ignore "hidden" parts
        if (this.profile.extra.hidden !== "") {
            const re = new RegExp(
                String.raw`<${this.profile.extra.hidden}>(.*?)<\/${this.profile.extra.hidden}>`,
                "gms",
            );
            text = text.replaceAll(re, "");
        }

        return text;
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
            .use(customStringify, {
                profile: this.profile,
                globalVars: this.globalVars,
                frontmatterVars: this.frontmatterVars,
            })
            .process(input);

        const rendered =
            this.profile.extra.before +
            String(content) +
            this.profile.extra.after;

        return rendered;
    }

    private postprocess(input: string): string {
        input = applyModifiers(input);
        return input;
    }
}
