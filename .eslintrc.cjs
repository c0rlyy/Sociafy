module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh", "@typescript-eslint"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "after-used",
        caughtErrors: "all",
        ignoreRestSiblings: false,
        reportUsedIgnorePattern: false,
      },
    ],
    // "no-unused-vars": "warn",
    // "no-unused-imports": "warn",
    // "unused-imports/no-unused-imports": "warn",
    // "unused-imports/no-unused-vars": [
    //   "warn",
    //   {
    //     vars: "all",
    //     varsIgnorePattern: "^_",
    //     args: "after-used",
    //     argsIgnorePattern: "^_",
    //   },
    // ],
  },
};
