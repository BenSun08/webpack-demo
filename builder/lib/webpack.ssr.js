const merge = require('./merge');

const baseConfig = require('./webpack.base');

const ssrConfig = {
  mode: 'production',
  module: {
    rules: [
      { test: /\.css$/i, use: 'ignore-loader' },
      { test: /\.s[ac]ss$/i, use: 'ignore-loader' },
    ],
  },
};

module.exports = merge(baseConfig, ssrConfig);
