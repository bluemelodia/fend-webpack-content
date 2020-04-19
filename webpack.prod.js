const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: "./src/client/index.js",
    output: {
        libraryTarget: "var",
        library: "Client"
    },
    module: {
        rules: [
            /* Use enforce: 'pre' to check source files, 
             * not modified by other loaders. */
            {
                enforce: "pre",
                test: "/\.js$/",
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    cache: true,
                },
            },
            /* Get Webpack to use Babel. */
            {
                test: "/\.js$/",
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.scss$/,
                use: [ MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
		new HtmlWebPackPlugin({
			template: "./src/client/views/index.html",
			filename: "./index.html",
        }),
        new MiniCSSExtractPlugin({ filename: '[name].css' })
	]
}