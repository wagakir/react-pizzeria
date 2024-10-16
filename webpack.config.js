// const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    // path: path.resolve(__dirname, "dist"),
    publicPath: "/react-pizzeria/",
    path: "https://wagakir.github.io/react-pizzeria/",
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "src/404.html", to: "404.html" }],
    }),
  ],
  // other configuration settings
};
