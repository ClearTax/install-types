const fs = require('fs');
const { types } = require("types-directory");
const without = require("lodash/without");
const difference = require("lodash/difference");
const intersection = require("lodash/intersection");

const {
  dependencies,
  devDependencies
} = JSON.parse((fs.readFileSync(`${process.cwd()}/package.json`)).toString());

const defaultOptions = {
  exclude: []
};

/**
 * @function typesyncer sync types
 * @param {*} [options=defaultOptions]
 * @returns { install, uninstall dependencies}
 */

function typesyncer(options = defaultOptions) {
  // packages dependencies
  const pDependencies = Object.keys(dependencies || {});
  const pDevDependencies = Object.keys(devDependencies || {});

  // all dependencies
  const allDeps = [...pDependencies, ...pDevDependencies];

  // dependencies
  const deps = without(allDeps, ...options.exclude);

  // installed types
  const typesInstalled = pDevDependencies.filter(
    d => d.indexOf("@types/") === 0
  );

  // dependencies for all installed types
  const depsTypes = without(typesInstalled.map(t => t.slice(7)), ...options.exclude);

  // unused types
  const unusedTypes = difference(depsTypes, deps).map(t => `@types/${t}`);

  // types available for dependencies
  const typesAvailable = intersection(deps, types).map(t => `@types/${t}`);

  // types to install
  const typesToInstall = difference(typesAvailable, typesInstalled);

  return {
    install: typesToInstall,
    uninstall: unusedTypes
  };
}

module.exports = typesyncer;
