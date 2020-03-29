module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/react",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": [0],
    "@typescript-eslint/no-use-before-define": [0],
    "react/prop-types": [0],
    "prettier/prettier": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  root: true,
};
