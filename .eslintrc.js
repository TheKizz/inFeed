const RuleOptions = {
  OFF: "off",
  WARN: "warn",
  ERROR: "error",
};

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "standard-with-typescript",
    "prettier",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": RuleOptions.OFF,
    "@typescript-eslint/explicit-function-return-type": RuleOptions.OFF,
    "@typescript-eslint/explicit-module-boundary-types": RuleOptions.OFF,
    "@typescript-eslint/no-explicit-any": RuleOptions.OFF,
    "@typescript-eslint/no-unsafe-argument": RuleOptions.WARN,
    "@typescript-eslint/prefer-readonly": RuleOptions.WARN,
    "@typescript-eslint/no-extraneous-class": RuleOptions.WARN,
    "@typescript-eslint/strict-boolean-expressions": RuleOptions.WARN,
  },
};
