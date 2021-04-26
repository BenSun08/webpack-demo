"use strict";
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  mode: "development",
  module: {
    rules: [
      { test: /\.js$/i, use: "babel-loader" },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // prior webpack5
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: { limit: 8192 },
      //     },
      //   ],
      //   // use: "file-loader",
      //   type: "javascript/auto", // for webpack5
      // },

      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    // hot: true,
    port: 9000,
  },
};
