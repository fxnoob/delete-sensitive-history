const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './popup-page/components/',
    resolve: {
        extensions: [".jsx"],
    },
    module: {
        rules: [
            {
                test: /popup-page\/components\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react']
                    }
                }
            }
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'popup.bundle.js'
    }
};