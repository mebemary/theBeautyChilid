"use strict";

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    context: __dirname,
    node: {
        __filename: true,
        __dirname: true
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
};
