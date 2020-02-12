# Install Types

Auto install (uninstall) typings for your package dependencies.

## Features

- :package: Works with `npm`, `yarn`, `pnpm`
- :sunny: Updated regularly
- :palm_tree: In sync with [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
- :fishing_pole_and_fish: Can be hooked with npm and husky hooks

## Install

### Module

`npm i install-types`

### CLI

`npm install -D install-types`

or globally

`npm install -g install-types`

## Usage

### As Module

`install-types` syncer can be directly used as a module, returning with an object for types to install and uninstall

```js
import typesyncer from "install-types";

const types = typesyncer();

/**
 * {
 *    install: {}, type dependencies to install
 *    uninstall: {} type dependencies to uninstall
 * }
 */
```

#### Options

| options   | description          | type  |
| --------- | -------------------- | ----- |
| `exclude` | exclude dependencies | Array |

### As CLI

You can use it directly in the cli if installed globally or can be used as a `postinstall` or `prebuild` script on your `package.json`.

```js
"scripts": {
  "postinstall": "install-types",
}
```

#### CLI Options

| options          | description                   |
| ---------------- | ----------------------------- |
| `--yarn`         | use `yarn` as package manager |
| `--pnpm`         | use `pnpm` as package manager |
| `--removeUnused` | remove unused types           |
| `--exclude`      | exclude dependencies          |

### Note

> `install-types` uses [types-directory](https://github.com/maddhruv/types-directory) internally sync with the types.
