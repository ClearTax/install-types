#!/usr/bin/env node

const { execSync } = require("child_process");
const chalk = require("chalk");
const yargs = require("yargs");

const { argv } = yargs
  .boolean("yarn")
  .boolean("pnpm")
  .boolean("bolt")
  .boolean("removeUnused")
  .array("exclude");

const typesyncer = require("..");

(() => {
  // package manager
  let installer = "npm i -D",
    uninstaller = "npm uninstall";

  if (argv.yarn) {
    installer = "yarn add -D";
    uninstaller = "yarn remove";
  } else if (argv.pnpm) {
    installer = "pnpm add -D";
    uninstaller = "pnpm remove";
  } else if (argv.bolt) {
    installer = "bolt add -D";
    uninstaller = "bolt remove";
  }

  const types = typesyncer({
    exclude: argv.exclude || [],
  });

  if (types.install.length === 0) {
    console.log(chalk.yellow("No new typings to install"));
  } else {
    const installCMD = `${installer} ${types.install.join(" ")}`;
    console.log(chalk.green("Installing", types.install.join(", ")));
    console.log(execSync(installCMD).toString());
  }

  if (argv.removeUnused) {
    if (types.uninstall.length === 0) {
      console.log(chalk.yellow("No unused typing to remove"));
    } else {
      const uninstallCMD = `${uninstaller} ${types.uninstall.join(" ")}`;
      console.log(chalk.green("Uninstalling", types.uninstall.join(", ")));
      console.log(execSync(uninstallCMD).toString());
    }
  }
})();
