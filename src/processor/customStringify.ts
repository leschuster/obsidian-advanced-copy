import { Root } from "mdast";
import { Profile } from "src/settings/settings";
import toCustom from "./toCustom";

export interface Options {
	profile: Profile;
}

export default function customStringify(options: Options): void {
	const self = this;

	self.compiler = compiler;

	function compiler(tree: Root) {
		return toCustom(tree, {
			...self.data("settings"),
			...options,
		});
	}
}
