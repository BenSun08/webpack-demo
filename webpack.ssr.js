"use strict";
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const glob = require("glob");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

function setMPA() {
  const entryFiles = glob.sync(
    path.resolve(__dirname, "src/*/index-server.js")
  );
  const MPAConfig = entryFiles.reduce(
    (prev, curr) => {
      const entryNameMatch = curr.match(/src\/(.*)\/index-server\.js/i);
      const entryName = entryNameMatch && entryNameMatch[1];
      if (entryName) {
        return {
          entry: {
            ...prev.entry,
            [entryName]: `./src/${entryName}/index-server.js`,
          },
          htmlWebpackPlugins: [...prev.htmlWebpackPlugins],
        };
      }
    },
    { entry: {}, htmlWebpackPlugins: [] }
  );
  return MPAConfig;
}
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, "dist-ssr"),
    publicPath: "",
    filename: "[name]-server.js",
    assetModuleFilename: "images/[name].[contenthash:8].[ext]", // for webpack 5
    globalObject: "this",
    library: {
      type: "umd",
    },
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
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "react",
          entry: "https://unpkg.com/react@17/umd/react.production.min.js",
          global: "React",
        },
        {
          module: "react-dom",
          entry:
            "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
          global: "ReactDOM",
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerWebpackPlugin()],
  },
};
