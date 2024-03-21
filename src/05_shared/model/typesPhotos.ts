export type TActivePhoto = {
    photoUid: string
}

/**
 * photoUid = chunkId = photoUid
 */

export type TPhoto = {
    [photoUid: string]: {
        path: string
    }
}