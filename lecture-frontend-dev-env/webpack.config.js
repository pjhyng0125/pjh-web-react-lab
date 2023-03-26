const path = require("path");
// const MyWebpackPlugin = require("./my-webpack-plugin");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/, // loader가 처리해야할 파일들의 패턴
      //   use: [path.resolve("./my-webpack-loader.js")],
      // },
      {
        test: /\.css$/, // loader가 처리해야할 파일들의 패턴
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpg)$/,
        // loader: "file-loader",
        loader: "url-loader",
        options: {
          // publicPath: "./dist/", // index.html에 dist 디렉토리로 이동
          name: "[name].[ext]?[hash]",
          limit: 20000, // 20kb
        },
        // use: ["file-loader"],
      },
    ],
  },
  // plugins: [new MyWebpackPlugin()],
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Build Date : ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
        User: ${childProcess.execSync("git config user.name")}
      `,
    }),
    new webpack.DefinePlugin({
      NUM: 7,
      STR: JSON.stringify("2+2"),
      "api.domain": JSON.stringify("www.devpjh.com"),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production"
      ? [
          new MiniCssExtractPlugin({
            filename: "[name].css",
          }),
        ]
      : []),
  ],
  // target: "node",
  node: false,
};
