import webpack from "webpack";
import {TBuildOptions} from "./types";

type TResolvers = webpack.ResolveOptions

export const buildResolvers = ({src}: TBuildOptions): TResolvers => ({
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
        "@": src
    }
})