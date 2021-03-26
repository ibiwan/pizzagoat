module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
  },
  plugins: [
    'mocha',
  ],
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
  },
};
