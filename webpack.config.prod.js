const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function root(subPath) {
    return path.resolve(__dirname, subPath);
}

module.exports = {
    entry: {
        bundle: 'main.ts',
        style: 'styles/style.scss'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'scripts/[name].[chunkhash].js'
    },
    devtool: 'source-map',
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
                // loader: 'raw-loader!html-minifier-loader',
                use: [
                    {
                        loader: 'raw-loader'
                    }, 
                    {
                        loader: 'html-minifier-loader',
                        options: {
                            trimAttrs: 'd',
                            collapseAttrs: 'd'
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract([
                    // {
                    //     loader: 'style-loader'
                    // },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            url: false
                        }
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
        new UglifyJsPlugin({
            // parallel: true,
            uglifyOptions: {
                ie8: false,
                ecma: 6,
                warnings: true,
                mangle: true, // debug false
                output: {
                    comments: false,
                    beautify: false,  // debug true
                }
            },
            // warnings: true,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            minify: {
                minifyJS: true
            }
        }),
        new CopyWebpackPlugin([
            { from: 'scripts', to: 'scripts' },
            { from: 'images', to: 'images' }
        ]),
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
    },
}