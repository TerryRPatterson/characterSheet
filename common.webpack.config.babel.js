import WebpackBuildNotifierPlugin from 'webpack-build-notifier';
import {HotModuleReplacementPlugin} from 'webpack';
import Dotenv from 'dotenv-webpack';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import {resolve} from 'path';
import formatter from 'eslint-friendly-formatter';


export const crossPlugins = [
    new HotModuleReplacementPlugin(),
    new WebpackBuildNotifierPlugin({
        title: 'Character Sheet',
        suppressSuccess: 'initial',
    }),
    new Dotenv({safe: true}),
    new FriendlyErrorsWebpackPlugin(),
];


export const crossDevServer = {
    quiet: true,
    port: 9000,
    hot: true,
    historyApiFallback: true,
    contentBase: resolve(__dirname, 'src/dist'),
    watchContentBase: true,
};

export const crossLoaders = [
    {
        test: /\.(?:svelte)|(?:m?js)/,
        exclude: /node_modules/,
        loader:'eslint-loader',
        options: {
            formatter,
        },
        enforce: 'pre',
    },
    {
        test: /\.m?js$/,
        use: {
            loader: 'babel-loader',
        },
    },
    {
        test: /\.yaml/,
        use: ['json-loader', 'js-yaml-loader'],
    },
];

export const crossMainFields = ['module', 'main'];

export const extensions = ['.svelte', '.mjs', '.js', '.json', '.yaml', 'scss'];
