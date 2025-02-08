import { Nodes } from "mdast";
import { Profile } from "src/settings/settings";
import { zwitch } from "zwitch";
import { handlers } from "./handlers";
import { Logger } from "src/utils/Logger";

export interface CustomOptions {
    profile: Profile;
    topLevel?: boolean;
    isFirstOfType?: boolean;
    isLastOfType?: boolean;
    isFirstChild?: boolean;
    isLastChild?: boolean;
    indentation?: number;
}

export default function toCustom(node: Nodes, options: CustomOptions): string {
    console.log("toCustom", node, options);

    const handle = zwitch("type", {
        invalid,
        unknown,
        handlers,
    });

    return handle(node, options);
}

// Invalid value
function invalid(value: unknown): never {
    throw new Error(`Cannot handle value '${value}', expected node`);
}

// Node type is unknown
function unknown(value: unknown, opts: CustomOptions): string {
    const node = value as Nodes;

    if ("value" in node) {
        return node.value;
    }

    if ("children" in node) {
        const childOpts = { ...opts, topLevel: false };
        return node.children
            .map((child) => toCustom(child, childOpts))
            .join("");
    }

    if ("label" in node && node.label) {
        return node.label;
    }

    if ("identifier" in node && node.identifier) {
        return node.identifier;
    }

    Logger.warn(`Cannot handle unknown node '${node.type}'`);

    return "";
}
