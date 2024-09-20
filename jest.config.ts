import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
    preset: "ts-jest/presets/default-esm",
    roots: ["<rootDir>"],
    extensionsToTreatAsEsm: [".ts"],
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
    },
    moduleNameMapper: {
        "^obsidian$": "<rootDir>/__mocks__/obsidian",
    },
    modulePaths: ["<rootDir>", "node_modules"],
    moduleDirectories: ["node_modules", "src"],
};

export default config;
