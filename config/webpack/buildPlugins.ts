import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {TBuildOptions} from "./types";
import path from "node:path";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

type TPlugins = webpack.Configuration['plugins']

export const buildPlugins = ({public: publicPath, html, analyzer, isDev}: TBuildOptions): TPlugins => {
    const plugins: TPlugins = [
        new HtmlWebpackPlugin({
            template: html,
            favicon: path.resolve(publicPath, 'favicon.ico'),
        }),
        new ForkTsCheckerWebpackPlugin(),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env)
        })
    ]

    if (isDev) {
        plugins.push(new MiniCssExtractPlugin())
        plugins.push(new ReactRefreshWebpackPlugin())
    }

    analyzer &&
        plugins.push(new BundleAnalyzerPlugin())

    return plugins
}