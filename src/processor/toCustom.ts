import { Nodes } from "mdast";
import { Profile } from "src/settings/settings";
import { zwitch } from "zwitch";
import { handlers } from "./handlers/handlers";

export interface Options {
	profile: Profile;
}

export default function toCustom(node: Nodes, { profile }: Options): string {
	const handle = zwitch("type", {
		invalid,
		unknown,
		handlers,
	});

	return handle(node, profile);
}

// Invalid value
function invalid(value: unknown): never {
	throw new Error(`Cannot handle value '${value}', expected node`);
}

// Node type is unknown
function unknown(value: unknown): never {
	const node = value as Nodes;
	throw new Error(`Cannot handle unknown node '${node.type}'`);
}
