export type TActivePhoto = {
    chunkUid: string,
    photoUid: string
}

export type TChunks = {
    [chunkUid: string]: TPhoto
}

export type TPhoto = {
    [photoUid: string]: {
        path: string
    }
}