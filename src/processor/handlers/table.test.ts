import { DEFAULT_SETTINGS } from "src/settings/default-settings";
import { CustomOptions } from "../toCustom";
import { Table, TableCell, TableRow } from "mdast";
import { table } from "./table";

describe("testing table", () => {
    let opts: CustomOptions;

    beforeEach(() => {
        const profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_html"],
        );
        opts = { profile };
    });

    test("should return empty string for missing children", () => {
        const input: Table = {
            type: "table",
            children: [],
        };
        const expected = "";
        expect(table(input, opts)).toBe(expected);
    });

    test("should return table with empty header row", () => {
        const input: Table = {
            type: "table",
            children: [
                {
                    type: "tableRow",
                    children: [],
                } satisfies TableRow,
            ],
        };
        const expected =
            "<table>\n<thead>\n<tr>\n</tr>\n</thead>\n<tbody>\n</tbody>\n</table>\n";
        expect(table(input, opts)).toBe(expected);
    });

    test("should render a table with header row but no content rows", () => {
        const input: Table = {
            type: "table",
            children: [
                {
                    type: "tableRow",
                    children: [
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "Header1" }],
                        } satisfies TableCell,
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "Header2" }],
                        } satisfies TableCell,
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "Header3" }],
                        } satisfies TableCell,
                    ],
                } satisfies TableRow,
            ],
        };
        const expected =
            '<table>\n<thead>\n<tr>\n<th class="text-default">Header1</th>\n<th class="text-default">Header2</th>\n<th class="text-default">Header3</th>\n</tr>\n</thead>\n<tbody>\n</tbody>\n</table>\n';
        expect(table(input, opts)).toBe(expected);
    });

    test("should render a table with header and one content row", () => {
        const input: Table = {
            type: "table",
            children: [
                {
                    type: "tableRow",
                    children: [
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "H1" }],
                        } satisfies TableCell,
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "H2" }],
                        } satisfies TableCell,
                    ],
                } satisfies TableRow,
                {
                    type: "tableRow",
                    children: [
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "C1" }],
                        } satisfies TableCell,
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "C2" }],
                        } satisfies TableCell,
                    ],
                } satisfies TableRow,
            ],
        };
        const expected =
            '<table>\n<thead>\n<tr>\n<th class="text-default">H1</th>\n<th class="text-default">H2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td class="text-default">C1</td>\n<td class="text-default">C2</td>\n</tr>\n</tbody>\n</table>\n';
        expect(table(input, opts)).toBe(expected);
    });

    test("should render a table with column alignments", () => {
        const input: Table = {
            type: "table",
            align: ["left", "center", "right"],
            children: [
                {
                    type: "tableRow",
                    children: [
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "A" }],
                        },
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "B" }],
                        },
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "C" }],
                        },
                    ],
                } satisfies TableRow,
                {
                    type: "tableRow",
                    children: [
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "1" }],
                        },
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "2" }],
                        },
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "3" }],
                        },
                    ],
                } satisfies TableRow,
            ],
        };
        const expected =
            '<table>\n<thead>\n<tr>\n<th class="text-left">A</th>\n<th class="text-center">B</th>\n<th class="text-right">C</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td class="text-left">1</td>\n<td class="text-center">2</td>\n<td class="text-right">3</td>\n</tr>\n</tbody>\n</table>\n';
        expect(table(input, opts)).toBe(expected);
    });

    test("should render a table with more columns than alignments", () => {
        const input: Table = {
            type: "table",
            align: ["left"],
            children: [
                {
                    type: "tableRow",
                    children: [
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "A" }],
                        },
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "B" }],
                        },
                    ],
                } satisfies TableRow,
                {
                    type: "tableRow",
                    children: [
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "1" }],
                        },
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "2" }],
                        },
                    ],
                } satisfies TableRow,
            ],
        };
        const expected =
            '<table>\n<thead>\n<tr>\n<th class="text-left">A</th>\n<th class="text-default">B</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td class="text-left">1</td>\n<td class="text-default">2</td>\n</tr>\n</tbody>\n</table>\n';
        expect(table(input, opts)).toBe(expected);
    });

    test("should render Markdown table with aligned cells", () => {
        // Set profile to markdown
        opts.profile = structuredClone(
            DEFAULT_SETTINGS.profiles["markdown_to_markdown"],
        );

        const input: Table = {
            type: "table",
            align: ["left", "center", "right"],
            children: [
                {
                    type: "tableRow",
                    children: [
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "Header1" }],
                        },
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "Header2" }],
                        },
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "Header3" }],
                        },
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "Header4" }],
                        },
                    ],
                },
                {
                    type: "tableRow",
                    children: [
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "Cell1" }],
                        },
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "Cell2" }],
                        },
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "Cell3" }],
                        },
                        {
                            type: "tableCell",
                            children: [{ type: "text", value: "Cell4" }],
                        },
                    ],
                },
            ],
        };
        const expected =
            "| Header1 | Header2 | Header3 | Header4 |\n| :-- | :-: | --: | --- |\n| Cell1 | Cell2 | Cell3 | Cell4 |\n\n";
        expect(table(input, opts)).toBe(expected);
    });
});
