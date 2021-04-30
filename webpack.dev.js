"use strict";
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ...htmlWebpackPlugins,
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "react",
          entry: "https://unpkg.com/react@17/umd/react.development.js",
          global: "React",
        },
        {
          module: "react-dom",
          entry: "https://unpkg.com/react-dom@17/umd/react-dom.development.js",
          global: "ReactDOM",
        },
      ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    // hot: true,
    port: 9000,
  },
  devtool: "eval",
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};
