export type TEnvOptions = {
    mode: "development" | "production",
    port: number,
    analyzer: boolean
}

export type TBuildOptions = TEnvOptions & {
    isDev: boolean,
    entry: string,
    output: string,
    html: string,
    src: string,
    public: string,
    env: string
}