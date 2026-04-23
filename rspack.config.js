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
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "typescript",
              },
              transform: {
                react: {
                  runtime: "automatic",
                },
              },
            },
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
};