import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import {TBuildOptions} from "./types";

export const buildDevServer = ({port, isDev}: TBuildOptions): DevServerConfiguration | undefined => isDev ? ({
    port,
    open: true,
    historyApiFallback: true,
    hot: true
}) : undefined