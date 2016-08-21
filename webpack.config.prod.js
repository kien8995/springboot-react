import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import {SRC, DEST} from "./tools/constant";

const GLOBALS = {
    "process.env.NODE_ENV": JSON.stringify("production")
};

export default {
    debug: true,
    devtool: "source-map",
    noInfo: false,
    context: SRC,
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    entry: "./index",
    target: "web",
    output: {
        path: DEST,
        publicPath: "/",
        filename: "bundle.js",
        library: "ReactDemo"
    },
    devServer: {
        contentBase: DEST
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin("styles.css"),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                pure_getters: true,
                screw_ie8: true
            }
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require("cssnano"),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: false
        })
    ],
    module: {
        loaders: [
            { test: /\.(js|jsx)$/, include: SRC, loaders: ["babel"], exclude: ["*.test.js"] },
            {
                test: /(\.(min|global)\.css)$/,
                loader: ExtractTextPlugin.extract("css-loader?sourceMap")
            },
            {
                test: /(\.module\.css)$/,
                include: SRC,
                loader: ExtractTextPlugin.extract(
                    "style-loader",
                    "css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
                    "postcss-loader"
                )
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
