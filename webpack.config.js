'use strict';

const webpack = require('webpack'); // eslint-disable-line no-unused-vars

module.exports = {
    mode: 'development',
    entry: './browser/index.js',
    output: {
        path: __dirname,
        filename: './public/js/bundle.js',
    },
    devServer: {
        inline: false,
        contentBase: "./dist",
    },
    context: __dirname,
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/react']
                    }
                }
            }
        ] ///
    }
};
