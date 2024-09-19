const findAndReplace = (tree, [regex, callback]) => {
    for (let i = 0; i < tree.children.length; i++) {
        const node = tree.children[i];

        if ("children" in node) {
            findAndReplace(node, [regex, callback]);
            continue;
        }

        if ("value" in node) {
            if (!regex.test(node.value)) {
                continue;
            }

            const newNodes = [];

            let text = node.value;
            let match = new RegExp(regex, "g").exec(text);
            while (match) {
                const [fullMatch, ...groups] = match;
                const [left, right] = text.split(fullMatch);

                if (left !== "") {
                    newNodes.push({
                        type: "text",
                        value: left,
                    });
                }

                text = right;

                newNodes.push(callback(fullMatch, ...groups));

                match = regex.exec(text);
            }

            if (text !== "") {
                newNodes.push({
                    type: "text",
                    value: text,
                });
            }

            tree.children.splice(i, 1, ...newNodes);
        }
    }
};

module.exports = {
    findAndReplace,
};
