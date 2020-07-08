const path = require("path");

// VSCode does not support this encodings, so we don't need to bundle them.
// This saves us some bytes, which is important for vscode-web.
const removeUnsupportedEncodings = [
  "utf7.js",
  "utf32.js"
].map((file) => {
  return {
    test: path.resolve(__dirname, "node_modules/iconv-lite/encodings", file),
    use: "fake-loader",
  };
});

module.exports = {
  entry: "iconv-lite",
  devtool: "source-map",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "iconv-lite-umd.js",
    libraryTarget: "umd",
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  module: {
    rules: removeUnsupportedEncodings,
  },
  resolveLoader: {
    alias: {
      "fake-loader": path.resolve(__dirname, "fake-loader.js"),
    },
  }
};
