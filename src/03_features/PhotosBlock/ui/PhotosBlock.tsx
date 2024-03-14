import React, {useEffect} from 'react';
import {mockImages} from "@/05_shared/mock";
import {TActivePhoto, TChunks, usePhotosStore} from "@/05_shared/model";

type PhotosBlockProps = {
    photos: TChunks
    activePhoto: TActivePhoto
    setActivePhoto: React.Dispatch<React.SetStateAction<TActivePhoto>>
}

export const PhotosBlock: React.FC<PhotosBlockProps> = ({
    activePhoto,
    setActivePhoto,
    photos
}) => {

    // const {photos} = usePhotosStore()

    return (
        <div className="w-1/6 flex flex-col px-8 py-4 white-border-r rounded-xl gap-6 overflow-y-auto">
            {Object
                .entries(photos)
                .flatMap(([chunkUid, value]) => Object.entries(value)
                    .map(([photoUid, {path}]) => (
                        <div className={`flex flex-col justify-center items-center select-none`}
                             key={photoUid+chunkUid}
                            onClick={() => setActivePhoto({chunkUid, photoUid})}
                        >
                            <img src={path} alt="" className={`rounded-xl ease-in-out transition-all duration-500
                            ${activePhoto.photoUid === photoUid && activePhoto.chunkUid === chunkUid && 
                            'shadow-lg shadow-sky-200/[0.4]'}`}/>
                            <p className="font-inter text-mainWhite">Image №{photoUid}</p>
                        </div>
                    ))
                )
            }
        </div>
    );
};