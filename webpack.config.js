const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        background: './src/background.js',
        popup: './popup-page/App.jsx'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env']
                }
            } ,
            {
                test: /src\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './popup-page/popup.html',
                force: true
            }
        ], {}) ,
        new CopyWebpackPlugin([
            {
                from: './src/app/',
                force: true
            }
        ], {})
    ] ,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        modules: [
            "./src/data" ,
            "node_modules"
        ],
        extensions: [".js" , ".jsx"]
    }
};