import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {TActivePhoto, TPhoto} from "@/05_shared/model/typesPhotos";

type State = {
    activePhoto: TActivePhoto
    photos: TPhoto
}

type Actions = {
    addPhoto: (photo: TPhoto) => void
    setActivePhoto: (photoUid: string) => void
    delPhoto: (photoUid: string) => void
    importContent: (state: State) => void
}

export const usePhotosStore = create<State & Actions>()(
    devtools(
        persist(
            set => ({
                activePhoto: {} as TActivePhoto,
                photos: {},
                addPhoto: (photo) => set(state => ({
                    photos: {
                        ...state.photos,
                        ...photo
                    },
                    activePhoto: {
                        photoUid: Object.keys(photo)[0]
                    }
                })),
                setActivePhoto: (photoUid) => set(() => ({
                    activePhoto: {photoUid}
                })),
                delPhoto: (photoUid) => set(state => {
                    const mutatePhotos = state.photos
                    const mutateActivePhoto = state.activePhoto
                    delete mutatePhotos[photoUid]
                    if (mutateActivePhoto.photoUid === photoUid)
                        mutateActivePhoto.photoUid = Object.keys(mutatePhotos)
                            ?.at(-1) ?? '0'
                    return {
                        photos: mutatePhotos,
                        activePhoto: mutateActivePhoto
                    }
                }),
                importContent: (state) => set(() => ({
                    ...state
                }))
            }), {name: 'usePhotosStore'}
        )
    )
)