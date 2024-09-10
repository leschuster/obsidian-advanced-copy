import { Text } from "mdast";
import { Profile } from "src/settings/settings";

// Convert a text node to string
export function text(node: Text, profile: Profile): string {
	return profile.text.replaceAll("$0", node.value);
}
