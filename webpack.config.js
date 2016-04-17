var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: [
        "./js/app.js",
        "./css/css.js"
    ],

    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'public/build'),
    },

    module: {
        loaders: [
            {
                test: /\.(es6|js)$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"],
            },
            // Extract css files
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            // Optionally extract less files
            // or any other compile-to-css language
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true')")
            },
            // You could also use other loaders the same way. I. e. the autoprefixer-loader
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ],
    },

    resolve : {
        extensions : ['', '.js', '.es6']
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new ExtractTextPlugin("style.css", {
            allChunks: true
        })
    ],
    watch : true
};
