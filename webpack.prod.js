"use strict";
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash:8].js",
    assetModuleFilename: "images/[name].[contenthash:8].[ext]", // for webpack 5
    clean: true,
  },
  mode: "production",
  module: {
    rules: [
      { test: /\.js$/i, use: "babel-loader" },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      // prior webpack5
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 8192,
      //         name: "[name].[contenthash:8].[ext]",
      //         outputPath: "images",
      //       },
      //     },
      //   ],
      //   // use: "file-loader",
      //   type: "javascript/auto", // for webpack5
      // },

      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Linkin Park",
      filename: "search.html",
      template: path.resolve(__dirname, "public", "index.html"),
      chunks: ["search"],
      inject: true,
      minify: true,
      // minify: {
      //   collapseWhitespace: true,
      //   keepClosingSlash: true,
      //   removeComments: true,
      //   removeRedundantAttributes: true,
      //   removeScriptTypeAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   useShortDoctype: true,
      // },
    }),
    new HtmlWebpackPlugin({
      title: "Test",
      filename: "app.html",
      template: path.resolve(__dirname, "public", "index.html"),
      chunks: ["app"],
      inject: true,
      minify: true,
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash:8].css" }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerWebpackPlugin()],
  },
};
