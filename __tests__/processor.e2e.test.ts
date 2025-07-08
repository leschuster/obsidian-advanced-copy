import { readFileSync } from "fs";
import { Processor } from "src/processor/processor";
import { GlobalVariables } from "src/processor/types";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Profile } from "src/settings/settings";

const MOCK_GLOAL_VARIABLES: GlobalVariables = {
    vaultName: "My Vault",
    fileBasename: "My File",
    fileExtension: "md",
    fileName: "My File.md",
    filePath: "some/path/My File.md",
    date: "01/01/2024",
    time: "03:00:00",
};

const testCases: {
    name: string;
    inputFile: string;
    outputFile: string;
    profile: Profile;
}[] = [
    {
        name: "Markdown to Markdown - Test Case 1",
        inputFile: "__fixtures__/input1.md",
        outputFile: "__fixtures__/output1.md",
        profile: {
            ...DEFAULT_SETTINGS.profiles.markdown_to_markdown,
            meta: {
                ...DEFAULT_SETTINGS.profiles.markdown_to_markdown.meta,
                encodeHTMLEntitiesHexOnly: true,
            },
        },
    },
    {
        name: "Markdown to HTML - Test Case 1",
        inputFile: "__fixtures__/input1.md",
        outputFile: "__fixtures__/output1.html",
        profile: {
            ...DEFAULT_SETTINGS.profiles.markdown_to_html,
            meta: {
                ...DEFAULT_SETTINGS.profiles.markdown_to_html.meta,
                encodeHTMLEntities: true,
            },
        },
    },
    {
        name: "Markdown to Markdown - Test Case 2",
        inputFile: "__fixtures__/input2.md",
        outputFile: "__fixtures__/output2.md",
        profile: DEFAULT_SETTINGS.profiles.markdown_to_markdown,
    },
    {
        name: "Markdown to HTML - Test Case 2",
        inputFile: "__fixtures__/input2.md",
        outputFile: "__fixtures__/output2.html",
        profile: DEFAULT_SETTINGS.profiles.markdown_to_html,
    },
    {
        name: "Markdown to Markdown - Test Case 3",
        inputFile: "__fixtures__/input3.md",
        outputFile: "__fixtures__/output3.md",
        profile: DEFAULT_SETTINGS.profiles.markdown_to_markdown,
    },
    {
        name: "Markdown to HTML - Test Case 3",
        inputFile: "__fixtures__/input3.md",
        outputFile: "__fixtures__/output3.html",
        profile: DEFAULT_SETTINGS.profiles.markdown_to_html,
    },
];

describe("Processor", () => {
    it.each(testCases)("$name", async ({ inputFile, outputFile, profile }) => {
        const input = readFileSync(inputFile, "utf-8");
        const expected = readFileSync(outputFile, "utf-8");
        const output = await Processor.process(
            input,
            profile,
            MOCK_GLOAL_VARIABLES,
            {},
        );
        expect(output).toEqual(expected);
    });
});
