import React, {useEffect, useRef, useState} from 'react';
import {photoBlock} from "@/05_shared/ui/icons";
import {TActivePhoto, TChunks, usePhotosStore} from "@/05_shared/model";

type EmptyImageProps = {
    photos: TChunks
    setPhotos: React.Dispatch<React.SetStateAction<TChunks>>
    activePhoto: TActivePhoto
    setActivePhoto: React.Dispatch<React.SetStateAction<TActivePhoto>>
}

export const EmptyImage: React.FC<EmptyImageProps> = ({
    activePhoto,
    photos,
    setActivePhoto,
    setPhotos
}) => {

    const [isActiveDrag, setIsActiveDrag] =
        useState<boolean>(false)
    const fileRef = useRef<HTMLInputElement>(null)

    // const {addChunk, addPhoto} = usePhotosStore()

    const handleDropFiles = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsActiveDrag(false)
        const chunkId = Object.keys(photos).length
        setPhotos(prevState => ({...prevState,
            [chunkId]: Object.fromEntries(
                Array.from(e.dataTransfer.files)
                .map((file, id) => [
                    id,
                    {path: URL.createObjectURL(file)}
                ])
            )
        }))

        // addChunk('1')
        // Array.from(e.dataTransfer.files)
        //     .forEach((file, id) => {
        //         addPhoto('1', {
        //             [id.toString()]: {
        //                 path: URL.createObjectURL(file)
        //             }
        //         })
        //     })
    }

    const handleChangFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        if (!e.target.files)
            return

        const chunkId = Object.keys(photos).length
        setPhotos(prevState => ({...prevState,
            [chunkId]: Object.fromEntries(
                Array.from(e.target.files!)
                    .map((file, id) => [
                        id,
                        {path: URL.createObjectURL(file)}
                    ])
            )
        }))
    };

    return (
        <div className="h-full w-full select-none cursor-pointer relative
        flex flex-col justify-center items-center gap-2"
             onDragEnter={(e) => {
                 e.preventDefault()
                 setIsActiveDrag(true)
             }}
             onDragLeave={(e) => {
                 e.preventDefault()
                 setIsActiveDrag(false)
             }}
             onClick={() => fileRef.current && fileRef.current.click()}
             onDrop={handleDropFiles}
             onDragOver={(e) => e.preventDefault()}
        >
            <div className="absolute w-full h-full"/>
            <photoBlock.upload color={isActiveDrag ? 'rgba(57, 143, 86)' : 'rgba(255, 255, 255, 0.3)'}
                               className="w-[70px] h-[70px] transition-all ease-in-out duration-500"/>
            <p className={`${isActiveDrag ? 'text-mainGreen' : 'text-white/[0.3]'} 
            text-3xl font-medium bg-ma transition-all ease-in-out duration-500`}>
                Перетащите сюда изображения или выберите из папки</p>
            <input type="file" ref={fileRef} className="hidden"
                   onChange={handleChangFiles} multiple accept="image/*"/>
        </div>
    );
};