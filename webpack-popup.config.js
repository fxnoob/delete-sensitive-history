const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './popup-page/components/index.jsx',
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env']
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
        ], {})
    ] ,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'popup.bundle.js'
    } ,
    resolve: {
        modules: [
            "node_modules"
        ],
        extensions: [".js" , ".jsx"]
    }
};