import { AlignType, Table, TableCell, TableRow } from "mdast";
import { CustomOptions } from "../toCustom";
import { convertChildren, getTemplate } from "../utils/handlerUtils";
import { MDTemplate } from "src/settings/settings";
import { modifyOptsBasedOnListIdx } from "../utils/modifyOptsBasedOnListIdx";

/**
 * Convert a table node to string.
 * @param node
 * @param opts
 * @returns
 */
export function table(node: Table, opts: CustomOptions): string {
    const template = getTemplate(opts.profile.templates.table, opts);

    const headerRow = node.children.first(); // there must only be one header row
    const contentRows = node.children.slice(1);

    if (!headerRow) {
        // missing content is allowed but not missing header
        return "";
    }

    const header = convertHeaderRow(headerRow, opts, node.align ?? null);
    const content = convertContentRows(contentRows, opts, node.align ?? null);

    return template
        .replaceAll("$header", header)
        .replaceAll("$content", content);
}

/**
 * Convert the header row of a table to string.
 * @param node
 * @param opts
 * @param colAlignments - list of alignments for each column
 * @returns
 */
function convertHeaderRow(
    node: TableRow,
    opts: CustomOptions,
    colAlignments: AlignType[] | null,
): string {
    const template = getTemplate(opts.profile.templates.tableRow, {
        ...opts,
        isFirstChild: true,
        isLastChild: true,
        isFirstOfType: true,
        isLastOfType: true,
        topLevel: false,
    });

    const content = convertCells(
        node.children,
        opts,
        opts.profile.templates.tableHeaderCell,
        colAlignments,
    );

    return template.replaceAll("$content", content);
}

/**
 * Convert all content rows of a table to string
 * @param nodes
 * @param opts
 * @param colAlignments - list of alignments for each column
 * @returns
 */
function convertContentRows(
    nodes: TableRow[],
    opts: CustomOptions,
    colAlignments: AlignType[] | null,
): string {
    return nodes.reduce((acc, row, idx) => {
        const rowOpts = modifyOptsBasedOnListIdx(opts, idx, nodes.length);
        const template = getTemplate(opts.profile.templates.tableRow, rowOpts);
        const cells = convertCells(
            row.children,
            opts,
            opts.profile.templates.tableCell,
            colAlignments,
        );

        return acc + template.replaceAll("$content", cells);
    }, "");
}

/**
 * Convert table cells to string
 * @param nodes
 * @param opts
 * @param profileTemplate - template to use
 * @param colAlignments
 * @returns
 */
function convertCells(
    nodes: TableCell[],
    opts: CustomOptions,
    profileTemplate: string | MDTemplate,
    colAlignments: AlignType[] | null,
): string {
    return nodes.reduce((acc, cell, idx) => {
        const cellOpts = modifyOptsBasedOnListIdx(opts, idx, nodes.length);
        const template = getTemplate(profileTemplate, cellOpts);

        const alignment: AlignType = colAlignments?.[idx] ?? null;
        const children = convertChildren(cell.children, cellOpts)
            .join("")
            .trimEnd();

        return (
            acc +
            template
                .replaceAll("$align", alignment ?? "default")
                .replaceAll("$content", children)
        );
    }, "");
}
