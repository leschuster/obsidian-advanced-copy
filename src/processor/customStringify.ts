import { Root } from "mdast";
import { Profile } from "src/settings/settings";
import toCustom, { CustomOptions } from "./toCustom";
import { FrontmatterVariables, GlobalVariables } from "./types";

export interface Options {
    profile: Profile;
    globalVars?: GlobalVariables;
    frontmatterVars?: FrontmatterVariables;
}

export default function customStringify(options: Options): void {
    // @ts-expect-error
    const self = this;

    self.compiler = compiler;

    function compiler(tree: Root) {
        return toCustom(tree, {
            ...self.data("settings"),
            ...options,
        } satisfies CustomOptions);
    }
}
