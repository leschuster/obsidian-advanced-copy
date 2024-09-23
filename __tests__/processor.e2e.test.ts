import { readFileSync } from "fs";
import { GlobalVariables, Processor } from "src/processor/processor";
import { DEFAULT_SETTINGS } from "src/settings/default-settings";

const MOCK_GLOAL_VARIABLES: GlobalVariables = {
    vaultName: "My Vault",
    fileBasename: "My File",
    fileExtension: "md",
    fileName: "My File.md",
    filePath: "some/path/My File.md",
    date: "01/01/2024",
    time: "03:00:00",
};

describe("Processor", () => {
    let input: string;

    beforeAll(() => {
        input = readFileSync("__fixtures__/input.md", "utf-8");
    });

    it("should test markdown_to_markdown", async () => {
        const expected = readFileSync(
            "__fixtures__/markdown_to_markdown.md",
            "utf-8",
        );
        const output = await Processor.process(
            input,
            DEFAULT_SETTINGS.profiles.markdown_to_markdown,
            MOCK_GLOAL_VARIABLES,
        );

        expect(output).toEqual(expected);
    });

    it("should test markdown_to_html", async () => {
        const expected = readFileSync(
            "__fixtures__/markdown_to_html.html",
            "utf-8",
        );
        const output = await Processor.process(
            input,
            DEFAULT_SETTINGS.profiles.markdown_to_html,
            MOCK_GLOAL_VARIABLES,
        );

        expect(output).toEqual(expected);
    });
});
