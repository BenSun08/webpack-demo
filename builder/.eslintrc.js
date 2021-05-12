module.exports = {
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base'],
  parser: '@babel/eslint-parser',
  plugins: ['jest'],
  rules: {
    'linebreak-style': 'off',
    'max-len': 'off',
  },
};
