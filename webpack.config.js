const path = require('path');

module.exports = {
    devtool: false,
    entry: {
        background: './src/background.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'extension/scripts')
    }
};