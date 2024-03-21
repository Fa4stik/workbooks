import React from 'react';
import {usePhotosStore} from "@/05_shared/lib";

type PhotosBlockProps = {
}

export const PhotosBlock: React.FC<PhotosBlockProps> = ({
}) => {

    const {photos, activePhoto, setActivePhoto} =
        usePhotosStore()

    return (
        <div className="w-1/6 flex flex-col px-8 py-4 white-border-r rounded-xl gap-6 overflow-y-auto">
            {Object.entries(photos)
                .flatMap(([chunkUid, value]) => Object.entries(value)
                    .map(([photoUid, {path}]) => (
                        <div className={`flex flex-col justify-center items-center select-none`}
                             key={photoUid+chunkUid}
                            onClick={() => setActivePhoto({chunkUid, photoUid})}
                        >
                            <img src={path} alt="" className={`rounded-xl ease-in-out transition-all duration-500
                            object-cover w-full
                            ${activePhoto.photoUid === photoUid && activePhoto.chunkUid === chunkUid &&
                            'shadow-lg shadow-sky-200/[0.4]'}`}
                            />
                            <p className="font-inter text-mainWhite">Image №{photoUid}</p>
                        </div>
                    ))
                )
            }
        </div>
    );
};