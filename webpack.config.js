const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function root(subPath) {
    return path.resolve(__dirname, subPath);
}

module.exports = {
    entry: {
        'bundle': 'main.ts',
        'style': 'styles/style.scss'
    },
    output: {
        path: path.join(__dirname),
        filename: '[name].[chunkhash].js'
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.ts', '.js', 'scss'],
        modules: [root(''), root('node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ],
                exclude: [/(node_modules)/]
            },
            {
                test: /\.html$/,
                use: 'raw-loader',
                exclude: [root('./index.html')]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract([
                    // {
                    //     loader: 'style-loader'
                    // },
                    {
                        loader: 'css-loader?url=false'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ])
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.[chunkhash].css'),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            chunks: ['bundle', 'style'],
            minify: {
                minifyJS: true
            }
        })
    ],
    devServer: {
        port: 3003
    },
    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
}