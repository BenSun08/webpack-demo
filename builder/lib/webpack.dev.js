const path = require('path');
const webpack = require('webpack');
const merge = require('./merge');

const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 9000,
  },
  devtool: 'source-map',
};

module.exports = merge(baseConfig, devConfig);
