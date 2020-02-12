const tap = require("tap");

const typesyncer = require("..");

let types = typesyncer();

tap.same(types, {
  install: ["@types/lodash", "@types/yargs"],
  uninstall: []
});

types = typesyncer({
  exclude: ["lodash"]
});

tap.same(types, {
  install: ["@types/yargs"],
  uninstall: []
});

types = typesyncer({
  exclude: ["lodash", "yargs"]
});

tap.same(types, {
  install: [],
  uninstall: []
});
