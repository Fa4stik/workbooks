import React, {useEffect, useRef, useState} from 'react';
import {photoBlock} from "@/05_shared/ui/icons";
import {usePhotosStore} from "@/05_shared/lib";
import {useGetChunkId} from "@/04_entities/ApiData";
import {useUploadFiles} from "@/04_entities/ApiData/lib/useUploadFiles";

type EmptyImageProps = {
}

export const EmptyImage: React.FC<EmptyImageProps> = ({
}) => {

    const [isActiveDrag, setIsActiveDrag] =
        useState<boolean>(false)
    const fileRef = useRef<HTMLInputElement>(null)
    const [chunkId, setChunkId] =
        useState<number>(0)

    const {addPhoto, setActivePhoto} = usePhotosStore()

    const { data: fetchChunkId, isSuccess } = useGetChunkId()
    const { mutate: mutateUploadFiles, paths} =
        useUploadFiles()

    const handleDropFiles = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsActiveDrag(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length <= 0)
            return

        mutateUploadFiles({chunk_id: chunkId, files: e.dataTransfer.files})
    }

    const handleChangFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        if (e.target.files && e.target.files.length <= 0)
            return

        mutateUploadFiles({chunk_id: chunkId, files: e.target.files!})
    };

    useEffect(() => {
        fetchChunkId && fetchChunkId.data &&
            setChunkId(fetchChunkId.data)
    }, [fetchChunkId, isSuccess]);

    useEffect(() => {
        if (paths.length <= 0)
            return

        paths.forEach((path, id) => {
            addPhoto({[chunkId+id]: {path}})
        })
    }, [paths]);

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
                   onChange={handleChangFiles} multiple accept="application/pdf, image/*"/>
        </div>
    );
};