const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  // 入口
  entry: path.resolve(__dirname, "src/ts/index.ts"),

  // 出口
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
    clean: true, // 先清空 dist，然后再输出最新内容
  },

  plugins: [

    new ESLintPlugin({
      fix: true, // 自动修复，前提运行了此项目 npm run dev
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      exclude: 'node_modules'
    }),
    
    new HtmlWebpackPlugin({
      // 以指定的 HTML 文件作为生成模板
      template: path.resolve(__dirname, "src/html/index.html"),
    }),
  ],

  module: {
    // 加载器
    rules: [
      // 规则列表
      {
        test: /\.css$/i, // 匹配 .css 结尾的文件
        use: ["style-loader", "css-loader"], // 使用从后到前的加载器来解析 css 代码和插入到 DOM
      },
      {
        test: /\.ts$/i, // 匹配 .ts 结尾的文件
        use: "ts-loader", // 使用从后到前的加载器来解析 ts 代码
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'], // 解析模块时的文件扩展名顺序
  },

};