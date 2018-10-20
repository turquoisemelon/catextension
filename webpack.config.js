var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const bundleOutputPath = path.resolve(__dirname, 'dist'); // base path for the bundle

module.exports = {
    entry: {
        'index': './src/index.js',
        'script' : './src/script.js',
    },
    output: {
        path: bundleOutputPath,
        filename: '[name]_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: "file-loader?name=assets/[name].[hash].[ext]"
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['index'],
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/meta'
            }
        ]),
        new Dotenv(),
    ]
};
