const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/client/index.js',
    module: {
        rules: [
            /* Get Webpack to use Babel. */
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
}