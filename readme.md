# babel-plugin-transform-yoga-style-spacing

> Work in progress. This is probably broken for many things and I'm certain it doesn't work with the emotion css prop preset. Also TypeScript understandably doesn't like these properties it doesn't know about. I'm looking into that and will test out some other cases but consider this experimental.

The style system in React Native (powered by Yoga) adds four critical properties to traditional CSS:

- `marginHorizontal`
- `marginVertical`
- `paddingHorizontal`
- `paddingVertical`

These provide shorthand for left/right and top/bottom.

This Babel transform plugin adds support for these properties by rewriting them as their component rules. For example:

Before:

```js
<div style={{ marginVertical: 16 }} />
```

After:

```js
<div style={{ marginTop: 16, marginBottom: 16 }} />
```

## Installation

NPM:

```sh
npm install --dev babel-plugin-transform-yoga-style-spacing
```

Yarn:

```sh
yarn add --dev babel-plugin-transform-yoga-style-spacing
```

Then add to your babel config ([more about babel configuration](https://babeljs.io/docs/en/configuration)):

```json
{
  "plugins": [
    // 'my-other-babel-plugin'
    "babel-plugin-transform-yoga-style-spacing"
    // ...
  ]
}
```

## Caveats

- doesn't currently work with the emotion css prop, probably because of plugin execution ordering
- TypeScript doesn't recognize the new properties
- It only works for `ObjectExpression`s and properties set by `Identitier`s. That is: `const styles = { marginVertical: 12 }` works. `styles['marginVertical']: 12;` does not. `const marginVerticalKey = 'marginVertical'; const styles= { [marginVerticalKey]: 12 };` does not.
- It duplicates _by source_ whatever is on the right hand side of the property assignment. These should not be A) Expensive B) Cause side effects C) Non-deterministic
