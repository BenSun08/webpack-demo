const glob = require("glob");
const path = require('path')

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-plugin')

function setMPA() {
  const entryFiles = glob.sync(path.resolve(__dirname, "src/*/index.js"));
  const MPAConfig = entryFiles.reduce(
    (prev, curr) => {
      const entryNameMatch = curr.match(/src\/(.*)\/index\.js/i);
      const entryName = entryNameMatch[1];
      return {
        entry: {
          ...prev.entry,
          [entryName]: `./src/${entryName}/index.js`,
        },
        htmlWebpackPlugins: [
          ...prev.htmlWebpackPlugins,
          new HtmlWebpackPlugin({
            title: entryName,
            filename: `${entryName}.html`,
            template: path.resolve(__dirname, "public", "index.html"),
            chunks: [entryName],
            inject: true,
            minify: {
              removeComments: false,
            },
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
    clean: true,
  },
  module: {
    rules: [
      { test: /\.js$/i, use: "babel-loader" },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
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
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
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
    new FriendlyErrorsWebpackPlugin(),
  ].concat(htmlWebpackPlugins)
}