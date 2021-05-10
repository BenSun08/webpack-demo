const path = require('path');

const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.base');
const merge = require('./merge');

const projectRoot = process.cwd();

const prodConfig = {
  mode: 'production',
  output: {
    path: path.resolve(projectRoot, 'dist'),
    filename: '[name].[contenthash:8].js',
    assetModuleFilename: 'assets/[name].[contenthash:8].[ext]',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 2 } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: ['last 2 version', '>1%'],
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash:8].css' }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerWebpackPlugin()],
    splitChunks: {},
  },
};

module.exports = merge(baseConfig, prodConfig);
