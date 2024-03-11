import React from 'react';
import {mockImages} from "@/05_shared/mock";
import {usePhotosStore} from "@/05_shared/model";

type PhotosBlockProps = {

}

export const PhotosBlock: React.FC<PhotosBlockProps> = ({

}) => {

    const {photos} = usePhotosStore()

    return (
        <div className="w-1/6 flex flex-col px-8 py-4 white-border-r rounded-xl gap-6 overflow-y-auto">
            {Object
                .entries(photos)
                .flatMap(([chunkUid, value]) => Object.entries(value))
                .map(([photoUid, {path}], id) => (
                    <div className="flex flex-col justify-center items-center" key={photoUid+id}>
                        <img src={path} alt="" className="rounded-xl"/>
                        <p className="font-inter text-mainWhite">name image #1</p>
                    </div>
                ))
            }
        </div>
    );
};