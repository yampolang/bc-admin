const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = {
    entry: path.resolve(__dirname, 'src', 'main.jsx'),

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.[contenthash].js',
        publicPath: "/",
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        "@babel/preset-env",
                        ["@babel/preset-react", {"runtime": "automatic"}]
                    ],
                    cacheDirectory: true,
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    },
                    "sass-loader",
                    "postcss-loader",
                ]
            },
        ],
    },

    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            Components: path.resolve(__dirname, 'src/components/'),
        },
    },

    devServer: {},

    plugins: [
        new HtmlWebPackPlugin({
            template: 'index.html',
            minify: {
                collapseWhitespace: isProd,
            }
        }),

        new CopyWebPackPlugin({
            patterns: [
                { from: "public", to: "." },
            ],
        }),
    ],
}