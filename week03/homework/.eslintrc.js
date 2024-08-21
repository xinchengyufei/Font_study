module.exports = {
  extends: ["eslint:recommended","plugin:@typescript-eslint/recommended"],
  env: {
    node: true,
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  plugins:["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },

  // 0 表示关闭规则，1 表示警告，2 表示错误
  rules: {
    "no-var": 2, 
    "no-console": 1
  },
};