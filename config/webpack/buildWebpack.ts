import {TBuildOptions} from "./types";
import webpack from "webpack";
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {buildLoaders} from "./buildLoaders";
import {buildDevServer} from "./buildDevServer";

export const buildWebpack = (options: TBuildOptions): webpack.Configuration => ({
    mode: options.mode,
    entry: options.entry,
    output: {
        path: options.output,
        publicPath: '/',
        filename: '[name].[contenthash].js',
        clean: true
    },
    plugins: buildPlugins(options),
    module: {
        rules: buildLoaders(options)
    },
    resolve: buildResolvers(options),
    devtool: options.isDev
        && 'inline-source-map',
    devServer: buildDevServer(options)
})