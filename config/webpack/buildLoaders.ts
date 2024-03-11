import webpack from "webpack";
import {TBuildOptions} from "./types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from 'react-refresh-typescript';

export const buildLoaders = ({isDev}: TBuildOptions): webpack.ModuleOptions['rules'] => {
    const svgr = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true
                                }
                            }
                        ]
                    }
                }
            }
        ],
    }

    const asset = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const css = {
        test: /\.css$/i,
        // Здесь можно вместо style-loader использовать ExtractPlugin
        use: [
            isDev ? MiniCssExtractPlugin.loader : 'style-loader',
            "css-loader",
            "postcss-loader"
        ],
    }

    const tsLoader = {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: require.resolve('ts-loader'),
                options: {
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                    }),
                    transpileOnly: isDev,
                },
            },
        ],
    }

    const swcLoader = {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
            {
                loader: 'swc-loader',
                options: {
                    jsc: {
                        transform: {
                            react: {
                                development: isDev,
                                refresh: isDev,
                            },
                        },
                    },
                },
            },
        ]
    }

    return [
        svgr,
        asset,
        css,
        swcLoader,
        // tsLoader
    ]
}