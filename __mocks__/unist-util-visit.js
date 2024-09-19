const SKIP = "skip";

const visit = (tree, check, visitor) => {
    if ("children" in tree) {
        for (let i = 0; i < tree.children.length; i++) {
            const child = tree.children[i];

            if (child.type === check) {
                const res = visitor(child, i, tree);
                if (res === SKIP) {
                    continue;
                }
            }

            visit(child, check, visitor);
        }
    }
};

module.exports = {
    SKIP,
    visit,
};
