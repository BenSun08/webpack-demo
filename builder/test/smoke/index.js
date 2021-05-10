const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');

process.chdir(path.resolve(__dirname, 'template'));
const prodConfig = require('../../lib/webpack.prod');

rimraf('./dist', () => {
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
  });
});
