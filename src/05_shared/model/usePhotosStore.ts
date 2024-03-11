import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {TActivePhoto, TChunks, TPhoto} from "@/05_shared/model/typesPhotos";

type State = {
    activePhoto: TActivePhoto
    photos: TChunks
}

type Actions = {
    addChunk: (chunkUid: string) => void
    addPhoto: (chunkUid: string, photo: TPhoto) => void
    setActivePhoto: (activePhoto: TActivePhoto) => void
}

export const usePhotosStore = create<State & Actions>()(
    devtools(
        persist(
            set => ({
                activePhoto: {} as TActivePhoto,
                photos: {},
                addChunk: (chunkUid) => set(state => ({
                    photos: Object.keys(state.photos).includes(chunkUid)
                        ? {...state.photos, [chunkUid]: {}}
                        : {...state.photos}
                })),
                addPhoto: (chunkUid, photo) => set(state => ({
                    photos: {...state.photos,
                        [chunkUid]: {
                            ...state.photos[chunkUid],
                            ...photo
                        }
                    }
                })),
                setActivePhoto: (activePhoto) => set(() => ({
                    activePhoto
                }))
            }), {name: 'usePhotosStore'}
        )
    )
)