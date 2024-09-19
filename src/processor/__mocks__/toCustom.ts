import { Nodes } from "mdast";
import { Profile } from "src/settings/settings";

declare interface Options {
    profile: Profile;
}

const toCustom = jest.fn((node: Nodes, _: Options): string => {
    return `<mock-${node.type}>...</mock-${node.type}>`;
});

module.exports = toCustom;
