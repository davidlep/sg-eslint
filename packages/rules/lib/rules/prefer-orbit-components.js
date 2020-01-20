"use strict";

const BannedComponents = ["Button", "Label"]

module.exports = {
    meta: {
        docs: {
            description:
                "Prefer orbit components over semantic-ui-react components.",
            category: "Strict Imports",
            recommended: false
        },
        fixable: null,
        schema: []
    },

    create: function(context) {
        return {
            ImportDeclaration(node) {
                if (node.source.value !== "semantic-ui-react") {
                    return;
                }

                node.specifiers.forEach(specifier => {
                    if (specifier.type !== "ImportSpecifier") {
                        return;
                    }
                    if (BannedComponents.findIndex(x => x === specifier.local.name) !== -1) {
                        context.report(
                            node,
                            `You should use the component \"${specifier.local.name}\" from @orbit-ui instead of the one from semantic-ui-react. The orbit documentation can be found here: https://sg-orbit.netlify.com`
                        );
                    }
                });
            }
        };
    }
};