const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
        ],
    },
    plugins: [
		new HtmlWebPackPlugin({
			template: "./src/client/views/index.html",
			filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
}