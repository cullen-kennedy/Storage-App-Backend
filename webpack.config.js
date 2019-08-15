const path = require('path');

module.exports = {
    context: __dirname,
    target: 'node',
    mode: 'development',
     entry: ['babel-polyfill', './server.js'],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};