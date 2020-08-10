module.exports = (babel) => {
  const { types: t } = babel;
  const doSplit = (propertyA, propertyB, propertyNode, path) => {
    propertyNode.key.name = propertyA;
    const newProperty = t.ObjectProperty(
      t.Identifier(propertyB),
      propertyNode.value
    );
    path.parent.properties.splice(path.key + 1, 0, newProperty);
  };

  return {
    name: "babel-plugin-transform-yoga-style-spacing",
    visitor: {
      ObjectProperty: (path) => {
        if (!t.isObjectExpression(path.parent)) {
          return;
        }
        const node = path.node;
        const propertyName = node.key.name;
        if (propertyName === "marginHorizontal") {
          doSplit("marginLeft", "marginRight", node, path);
        }
        if (propertyName === "marginVertical") {
          doSplit("marginTop", "marginBottom", node, path);
        }
        if (propertyName === "paddingHorizontal") {
          doSplit("paddingLeft", "paddingRight", node, path);
        }
        if (propertyName === "paddingVertical") {
          doSplit("paddingTop", "paddingBottom", node, path);
        }
      },
    },
  };
};
