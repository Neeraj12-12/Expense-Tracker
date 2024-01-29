const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = (env, argv) => {
  const config = {
    mode: "development",
    entry: "./src/index.js",
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      clean: true,
      assetModuleFilename: "[name][ext]",
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.(jpg|png|jpeg|gif|svg)$/i,
          type: "asset/resource",
        },
      ],
    },
    devtool: "inline-source-map",
    devServer: {
      port: 8080,
      compress: true,
      historyApiFallback: true,
      open: true,
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Expense Tracker",
        filename: "index.html",
        template: "./public/index.html",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: "./public/manifest.json",
            to: "",
          },
          {
            from: "./public/logo192.png",
            to: "",
          },
          {
            from: "./public/logo512.png",
            to: "",
          },
        ],
      }),
      new MiniCssExtractPlugin(),
    ],
  };

  if (argv.mode !== "development") {
    config.plugins.push(
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: "./src/src-sw.js",
        swDest: "sw.js",
        maximumFileSizeToCacheInBytes: 7000000, // 7MB
      })
    );
  }

  return config;
};
