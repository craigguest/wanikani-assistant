const path = require('path'),
      TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        "background": './src/background.js',
        "options": './src/options.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'extension/scripts')
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                terserOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            })
        ]
    }
};