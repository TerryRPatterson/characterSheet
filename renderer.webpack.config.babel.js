import * as common from './common.webpack.config.babel';
import {resolve} from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {sass} from 'svelte-preprocess-sass';

const workPath = resolve(__dirname, 'src/renderer');

const rendererPlugins = [
    ...common.crossPlugins,
    new HtmlWebpackPlugin({
        template: resolve(workPath, 'template.html'),
    }),
    new MiniCssExtractPlugin(),
];


const rendererDevServer = {
    ...common.crossDevServer,

};


const rendererLoaders = [
    ...common.crossLoaders,
    {
        test: /\.(sa|sc|c)ss$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    hmr: true,
                },
            },
            'css-loader',
            'sass-loader',
        ],
    },
    {
        test : /\.svelte$/,
        use: {
            loader: 'svelte-loader',
            options: {
                emitCss: true,
                preprocess:  {
                    style: sass(),
                },
            },
        },
    },
];


const rendererMainFields = [
    ...common.crossMainFields,
    'svelte',
    'browser',
    'styles',
];


const rendererAlias = {
    ...common.crossAlias,
    '@': workPath,
};


export default {
    devtool: 'source-map',
    context: workPath,
    output: {
        filename: 'dist-renderer.js',
    },
    resolve: {
        mainFields: rendererMainFields,
        alias: rendererAlias,
        extensions: common.extensions,
    },
    name: 'renderer-process',
    target: 'web',
    entry: './main.js',
    mode: 'development',
    plugins: rendererPlugins,
    devServer: rendererDevServer,
    module: {
        rules: rendererLoaders,
    },
};
