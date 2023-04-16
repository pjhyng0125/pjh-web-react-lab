const path = require("path");
// const MyWebpackPlugin = require("./my-webpack-plugin");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const apiMocker = require("connect-api-mocker");
const OptimizerCSSAssetPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV || "development"; // 기본값 development 설정

module.exports = {
  mode,
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },

    onBeforeSetupMiddleware: (devServer) => {
      devServer.app.use(apiMocker("/api", "mocks/api"));
    },

    proxy: {
      "/api": "http://localhost:8081/",
    },
    hot: true,
  },
  optimization: {
    minimizer:
      mode === "production"
        ? [
            new OptimizerCSSAssetPlugin(),
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true, // 콘솔 로그를 제거한다
                },
              },
            }),
          ]
        : [],
    splitChunks: {
      chunks: "all",
    },
  },
  externals: {
    axios: "axios",
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/, // loader가 처리해야할 파일들의 패턴
      //   use: [path.resolve("./my-webpack-loader.js")],
      // },
      {
        test: /\.(scss|css)$/, // loader가 처리해야할 파일들의 패턴
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader // 운영
            : "style-loader", // 개발
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        // loader: "file-loader",
        loader: "url-loader",
        options: {
          // publicPath: "./dist/", // index.html에 dist 디렉토리로 이동
          name: "[name].[ext]?[hash]",
          limit: 20000, // 20kb
        },
        // use: ["file-loader"],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        // use: ["babel-loader"],
        exclude: /node_modules/,
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
    new CopyPlugin({
      patterns: [
        {
          from: "./node_modules/axios/dist/axios.min.js",
          to: "./axios.min.js",
          toType: "file",
        },
      ],
    }),
  ],
  // target: "node",
  // node: false,
};
