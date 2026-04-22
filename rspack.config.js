const { rspack } = require("@rspack/cli");

/** @type {import('@rspack/cli').Configuration} */
module.exports = {
  entry: "./src-ts/api/main.ts",
  output: {
    path: "./builds",
    filename: "dist.min.js",
  },
  mode: "production",
  optimization: {
    minimize: true,
  },
  builtins: {
    html: false,
  },
};