# install-types

Auto install typings for your package dependencies.

## Install

`npm install -D install-types`

or globally

`npm install -g install-types`

## Usage

You can use it directly in the cli if installed globally or can be used as a `postinstall` script on your `package.json`.

```js
"scripts": {
  "postinstall": "install-types",
}
```

### Note

> `install-types` uses [typesync](https://github.com/jeffijoe/typesync) internally to check the types.
