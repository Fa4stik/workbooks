import webpack from "webpack";
import path from 'path';
import {TEnvOptions} from "./config/webpack/types";
import {buildWebpack} from "./config/webpack/buildWebpack";
import dotenv from 'dotenv'
dotenv.config()

const src = path.resolve(__dirname, 'src')
const publicPath = path.resolve(__dirname, 'public')

const config = ({mode, analyzer, port}: TEnvOptions): webpack.Configuration => buildWebpack({
    mode,
    port,
    analyzer,
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(publicPath, 'index.html'),
    public: publicPath,
    entry: path.resolve(src, '01_app', 'index.tsx'),
    src,
    isDev: mode === 'development',
    env: path.resolve(__dirname, '.env')
})

export default config