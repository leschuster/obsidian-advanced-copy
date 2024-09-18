const { createDefaultEsmPreset } = require("ts-jest");

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	testEnvironment: "node",
	transform: {
		...createDefaultEsmPreset().transform,
		//		"^.+.tsx?$": ["ts-jest", {}],
	},
	roots: ["<rootDir>"],
	modulePaths: ["<rootDir>"],
	moduleDirectories: ["node_modules", "src"],
};
