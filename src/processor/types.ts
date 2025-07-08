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

/**
 * Frontmatter variables that are set based on the current file
 */
export type FrontmatterVariables = Record<string, string>;
