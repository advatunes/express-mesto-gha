module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "airbnb-base"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "no-underscore-dangle": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["node_modules/"],
  globals: {
    foo_: true,
    _bar: true,
  },
};
