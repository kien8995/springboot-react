import webpack from "webpack";
import {SRC, DEST} from "./tools/constant";

export default {
  debug: true,
  devtool: "cheap-module-eval-source-map",
  noInfo: false,
  context: SRC,
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  entry: [
    "./index",
    "eventsource-polyfill", // necessary for hot reloading with IE
    "webpack-hot-middleware/client?reload=true" //note that it reloads the page if hot module reloading fails.
  ],
  target: "web",
  output: {
    path: DEST, // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: SRC,
    port: 3000
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, include: SRC, loaders: ["babel"] },
      {
        test: /(\.(min|global)\.css)$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /(\.module\.css)$/,
        include: SRC,
        loaders: [
          "style-loader",
          "css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
          "postcss-loader"
        ]
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  postcss: [
    require("autoprefixer"),
    require("postcss-color-rebeccapurple")
  ]
};
