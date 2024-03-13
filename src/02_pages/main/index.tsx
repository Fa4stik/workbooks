import React, {useEffect, useState} from 'react';
import {ContentBlock} from "@/03_features/Content";
import {PhotoBlock} from "@/03_features/PhotoBlock";
import {ControlGrid} from "@/03_features/RowsBlock";
import {PhotosBlock} from "@/03_features/PhotosBlock";
import {TActivePhoto, TChunks, usePhotosStore} from "@/05_shared/model";

type MainProps = {

}

export const Main: React.FC<MainProps> = ({

}) => {

    // const {photos} = usePhotosStore()
    const [activePhoto, setActivePhoto] =
        useState<TActivePhoto>({} as TActivePhoto)
    const [photos, setPhotos] =
        useState<TChunks>({})

    return (
        <div className="max-w-screen h-screen bg-mainDark flex white-border relative overflow-hidden">
            {Object.keys(photos).length > 0 && (
                <PhotosBlock photos={photos}
                             activePhoto={activePhoto}
                             setActivePhoto={setActivePhoto}
                />
            )}
            <div className="flex flex-col flex-1 divide-y-2 divide-solid">
                <div className="w-full h-[60%] flex">
                    <PhotoBlock photos={photos}
                                activePhoto={activePhoto}
                                setActivePhoto={setActivePhoto}
                                setPhotos={setPhotos}
                    />
                </div>
                <ContentBlock/>
            </div>
            <ControlGrid/>
        </div>
    );
};