const { mergeWithRules }  = require('webpack-merge')

module.exports = mergeWithRules({
  output: 'match',
  module: {
    rules: {
      test: "match",
      use: 'replace',
    },
  },
  plugins: 'append'
})
