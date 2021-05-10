const path = require('path');
const webpack = require('webpack');
const merge = require('./merge');

const baseConfig = require('./webpack.base');

const projectRoot = process.cwd();

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.join(projectRoot, 'dist'),
    compress: true,
    hot: true,
    port: 9000,
  },
  devtool: 'source-map',
};

module.exports = merge(baseConfig, devConfig);
