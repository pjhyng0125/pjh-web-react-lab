const path = require("path");

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
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg)$/,
        // loader: "file-loader",
        loader: "url-loader",
        options: {
          publicPath: "./dist/",
          name: "[name].[ext]?[hash]",
          limit: 20000, // 20kb
        },
        // use: ["file-loader"],
      },
    ],
  },
};
