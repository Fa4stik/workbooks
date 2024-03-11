import React, {useState} from 'react';
import {photoBlock} from "@/05_shared/ui/icons";
import {usePhotosStore} from "@/05_shared/model";

type EmptyImageProps = {}

export const EmptyImage: React.FC<EmptyImageProps> = ({}) => {
    const [isActiveDrag, setIsActiveDrag] =
        useState<boolean>(false)

    const {addChunk, addPhoto} = usePhotosStore()

    const handleDropFiles = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsActiveDrag(false)
        addChunk('1')
        Array.from(e.dataTransfer.files)
            .forEach((file, id) => {
                addPhoto('1', {
                    [id.toString()]: {
                        path: URL.createObjectURL(file)
                    }
                })
            })
    }

    return (
        <div className="h-full w-full select-none
        flex flex-col justify-center items-center gap-2"
             onDragEnter={(e) => {
                 e.preventDefault()
                 setIsActiveDrag(true)
             }}
             onDragLeave={(e) => {
                 e.preventDefault()
                 setIsActiveDrag(false)
             }}
             onDrop={handleDropFiles}
             onDragOver={(e) => e.preventDefault()}
        >
            <div className="absolute w-full h-full"/>
            <photoBlock.upload color={isActiveDrag ? 'rgba(57, 143, 86)' : 'rgba(255, 255, 255, 0.3)'}
                               className="w-[70px] h-[70px] transition-all ease-in-out duration-500"/>
            <p className={`${isActiveDrag ? 'text-mainGreen' : 'text-white/[0.3]'} 
            text-3xl font-medium bg-ma transition-all ease-in-out duration-500`}>
                Перетащите сюда изображения или выберите из папки</p>
        </div>
    );
};