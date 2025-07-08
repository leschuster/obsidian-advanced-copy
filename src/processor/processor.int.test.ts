import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { Processor } from "./processor";
import { Profile } from "src/settings/settings";
import { GlobalVariables } from "./types";

const mockGlobalVars: GlobalVariables = {
    vaultName: "Test Vault",
    fileBasename: "test.md",
    fileExtension: ".md",
    fileName: "test",
    filePath: "/path/to/test.md",
    date: "2023-10-01",
    time: "12:00",
};

describe("Processor integration tests", () => {
    let profile: Profile;

    beforeEach(() => {
        profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );

        profile.templates.heading1 = "<heading1>$value</heading1>";
        profile.templates.paragraph = "<paragraph>$value</paragraph>";
        profile.templates.text = "$value";
        profile.extra.before = "<before />";
        profile.extra.after = "<after />";
    });

    it("should process markdown to HTML correctly", async () => {
        const input = "# Hello World\n\nThis is a test.";
        const output = await Processor.process(
            input,
            profile,
            mockGlobalVars,
            {},
        );
        expect(output).toBe(
            "<before /><heading1>Hello World</heading1><paragraph>This is a test.</paragraph><after />",
        );
    });

    it("should handle empty input", async () => {
        const input = "";
        const output = await Processor.process(
            input,
            profile,
            mockGlobalVars,
            {},
        );
        expect(output).toBe("<before /><after />");
    });

    it("should replace global variables correctly", async () => {
        profile.templates.text =
            "Vaultname: $vaultName,\nFileBasename: $fileBasename,\nFileExtension: $fileExtension,\nFileName: $fileName,\nFilePath: $filePath,\nDate: $date,\nTime: $time\n\n$value";
        const input = "Test";
        const output = await Processor.process(
            input,
            profile,
            mockGlobalVars,
            {},
        );
        expect(output).toBe(
            "<before /><paragraph>Vaultname: Test Vault,\nFileBasename: test.md,\nFileExtension: .md,\nFileName: test,\nFilePath: /path/to/test.md,\nDate: 2023-10-01,\nTime: 12:00\n\nTest</paragraph><after />",
        );
    });

    it("should handle simple string templates", async () => {
        profile.templates.text = "$value";
        profile.templates.bold = "<bold>$value</bold>";
        profile.templates.paragraph = "<paragraph>$value</paragraph>";
        const input = "Hello, **world**!";
        const output = await Processor.process(
            input,
            profile,
            mockGlobalVars,
            {},
        );
        expect(output).toBe(
            "<before /><paragraph>Hello, <bold>world</bold>!</paragraph><after />",
        );
    });

    it("should handle object templates", async () => {
        profile.templates.text = "$value";
        profile.templates.bold = { template: "<bold>$value</bold>" };
        profile.templates.paragraph = "<paragraph>$value</paragraph>";
        const input = "Hello, **world**!";
        const output = await Processor.process(
            input,
            profile,
            mockGlobalVars,
            {},
        );
        expect(output).toBe(
            "<before /><paragraph>Hello, <bold>world</bold>!</paragraph><after />",
        );
    });

    it("should handle additional templates", async () => {
        profile.templates.text = "$value";
        profile.templates.heading1 = "# $value\n\n";
        profile.templates.bold = {
            template: "<default />",
            templateFirstChild: "<first-child />",
            templateLastChild: "<last-child />",
            templateFirstOfType: "<first-of-type />",
            templateLastOfType: "<last-of-type />",
        };
        profile.templates.paragraph = "<paragraph>$value</paragraph>\n\n";
        profile.extra.before = "";
        profile.extra.after = "";

        const input = `
# **first-child** hello **default** hello **last-child**

Hello, **first-of-type**!

Hello, **last-child**

**first-child** hello **default** **default** hello **last-of-type** hello.
`;
        const output = await Processor.process(
            input,
            profile,
            mockGlobalVars,
            {},
        );
        expect(output).toBe(
            `# <first-child /> hello <default /> hello <last-child />

<paragraph>Hello, <first-of-type />!</paragraph>

<paragraph>Hello, <last-child /></paragraph>

<paragraph><first-child /> hello <default /> <default /> hello <last-of-type /> hello.</paragraph>`,
        );
    });

    it("should use modifiers correctly", async () => {
        profile.templates.bold = {
            template: "$value",
            templateFirstChild: "$capitalize{$value}-$upper{$value}",
            templateLastChild: "$lower{$value}-$reverse{$value}",
            templateFirstOfType: "$blank{$value}-$replace{$value,Hello,Hi}",
            templateLastOfType: "$replace{$value,Hello,Ho}-$blank{$value}",
        };
        profile.templates.paragraph = "$value\n\n";
        profile.extra.before = "";
        profile.extra.after = "";

        const input = `**greetings**, **lorem** **iPsUm**

And **Hello, world** to **you**!`;
        const output = await Processor.process(
            input,
            profile,
            mockGlobalVars,
            {},
        );
        expect(output).toBe(
            `Greetings-GREETINGS, lorem ipsum-mUsPi

And -Hi, world to you-!`,
        );
    });
});
