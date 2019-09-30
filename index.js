#!/usr/bin/env node

const { spawn, execSync } = require("child_process");
const chalk = require("chalk");

/**
 * Run npm install
 * @return {void}
 */
const installDeps = () => {
  console.log(chalk.cyan("Installing types for your dependencies.."));
  const cmd = spawn(`npm`, ["install"], {
    stdio: "inherit"
  });
  cmd.on("close", returnCode => {
    process.exit(returnCode);
  });
};

const NO_TYPINGS_PATTERN = new RegExp(/no new typings added/i);

/**
 * Check if no types are added
 * @param {string} msg
 * @return {boolean}
 */
const isTypingsIgnored = msg => {
  if (msg && typeof msg === "string" && msg.length > 0) {
    return NO_TYPINGS_PATTERN.test(msg);
  }
  return false;
};

/**
 * Initialize method
 * @return {void}
 */
const init = () => {
  const stdout = execSync("typesync").toString();
  if (isTypingsIgnored(stdout)) {
    console.log(chalk.green(stdout));
    process.exit(0);
  } else {
    console.log(chalk.yellow(stdout));
    installDeps();
  }
};

init();
