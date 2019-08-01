import * as common from './common.webpack.config.babel';
import {resolve} from 'path';
import NodemonPlugin from 'nodemon-webpack-plugin';

const workPath = resolve(__dirname, 'src/main');

const mainLoaders = [
    ...common.crossLoaders,
];


const mainMainFields = [...common.crossMainFields];

const mainPlugins = [
    ...common.crossPlugins,
    new NodemonPlugin({
        exec: 'electron ./dist/dist-main.js',
        quiet: true,
    }),
];

const mainAlias = {
    ...common.crossAlias,
    '@': workPath,
};

export default {
    watch: true,
    devtool: 'source-map',
    context: workPath,
    output: {
        filename: 'dist-main.js',
    },
    resolve: {
        mainFields: mainMainFields,
        alias: mainAlias,
        extensions: common.extensions,
    },
    name: 'main-process',
    target: 'electron-main',
    entry: './index.js',
    mode: 'development',
    plugins: mainPlugins,
    module: {
        rules: mainLoaders,
    },
}
;
