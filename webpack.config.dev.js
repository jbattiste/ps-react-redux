const webpack = require("webpack"); // file configures webpack
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    // webpack has a web server
    stats: "minimal", // reduce command line output
    overlay: true, // overlay errors
    historyApiFallback: true, // all requests to index.html
    disableHostCheck: true, // chrome latest issue with webpack are next three
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // see require above
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],
  module: {
    rules: [
      // what files to handle?
      {
        test: /\.(js|jsx)$/, // look for javascript or js
        exclude: /node_modules/, // node code, don't look
        use: ["babel-loader", "eslint-loader"], // run babel on all javascript, webpack bundles,
        // code will be linted after bable
      },
      {
        test: /(\.css)$/, // webpack css processign
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
