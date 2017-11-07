'use strict';

const webpack = require("webpack");
const open = require("open");
const dialog = require("./dialog");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackOnBuildPlugin = require('on-build-webpack');

const webpackConfig = new Promise((res, rej) => {

    dialog.getSelectedGame().then(result => {
        res({
            context: __dirname + `/${result.game}`,
            entry: {
                app: "./app.js",
            },
            output: {
                path: __dirname + "/build/",
                filename: "[name].bundle.js",
            },
            stats: "none",
            plugins: [
                new HtmlWebpackPlugin({
                    template: __dirname + `/${result.game}/index.html`,
                    title: `${result.game}`,
                    filename: 'build.html'
                }),
                new WebpackOnBuildPlugin(() => open(__dirname + "/build/build.html"))
            ],
            module: {
                rules: [{
                    test: /\.js$/,
                    use:[{
                        loader: "babel-loader",
                        options: { presets: ["es2015"] }
                    }]
                }]
            }
        })
    })
});

module.exports = webpackConfig;