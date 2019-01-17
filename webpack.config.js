const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const clay = require('clay-css');
const fs = require('fs');
// const pages = [];
//
// fs.readdirSync('./src/pages').forEach(file => {
//     pages.push(file);
// })

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './public',
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        ...fs.readdirSync('./src/pages').map(page =>
            new HtmlWebpackPlugin({
                title: 'Liferay Static Theme Starter | ' + page,
                filename: page,
                template: './src/pages/' + page
            }),
        ),
        // new HtmlWebpackPlugin({
        //     title: 'Liferay Static Theme Starter',
        //     filename: 'index.html',
        //     template: './src/pages/index.html'
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'Pagina Pippo 2',
        //     filename: 'pippo.html',
        //     template: './src/pages/pippo.html'
        // }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        compact: false,
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    // { // only for build
                    //     loader: 'file-loader',
                    //     options: {
                    //         name: 'bundle.css',
                    //     },
                    // },
                    // {
                    //     loader: 'extract-loader',
                    // },
                    { // only for dev
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: clay
                                .includePaths
                                .concat(
                                    path.join(
                                        clay.includePaths[0],
                                        '../fonts'
                                    )
                                )
                        }
                    }
                ]
            }
        ]
    }
};