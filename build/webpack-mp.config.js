const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const Webpack = require('webpack');

module.exports = {
    context: path.resolve(cwd, `src/mp-webview-tool`),
    entry: './index.js',
    output: {
        path: path.resolve(cwd, 'dist'),
        filename: 'mp-webview-tool.js',
        libraryTarget: 'umd',
        library: 'mp-webview-tool'
    },
    resolveLoader: {
        modules: [ path.resolve(cwd, `build`), 'node_modules' ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ['raw-loader']
            }
        ]
    },
    plugins: [
        new Webpack.optimize.UglifyJsPlugin()
    ]
};