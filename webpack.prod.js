"use strict";
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const glob = require("glob");

function setMPA() {
  const entryFiles = glob.sync(path.resolve(__dirname, "src/*/index.js"));
  const MPAConfig = entryFiles.reduce(
    (prev, curr) => {
      const entryNameMatch = curr.match(/src\/(.*)\/index\.js/i);
      const entryName = entryNameMatch[1];
      return {
        entry: { ...prev.entry, [entryName]: `./src/${entryName}/index.js` },
        htmlWebpackPlugins: [
          ...prev.htmlWebpackPlugins,
          new HtmlWebpackPlugin({
            title: entryName,
            filename: `${entryName}.html`,
            template: path.resolve(__dirname, "public", "index.html"),
            chunks: [entryName],
            inject: true,
            minify: true,
          }),
        ],
      };
    },
    { entry: {}, htmlWebpackPlugins: [] }
  );
  return MPAConfig;
}
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
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
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 2 } },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: ["last 2 version", ">1%"],
                    },
                  ],
                  // [
                  //   "autoprefixer",
                  //   {
                  //     overrideBrowserslist: ["last 2 version", ">1%"],
                  //   },
                  // ],
                ],
              },
            },
          },
          "sass-loader",
        ],
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
    ...htmlWebpackPlugins,
    new MiniCssExtractPlugin({ filename: "[name].[contenthash:8].css" }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerWebpackPlugin()],
  },
};
