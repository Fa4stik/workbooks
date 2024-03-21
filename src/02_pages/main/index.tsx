import React from 'react';
import {ContentBlock} from "@/03_features/Content";
import {PhotoBlock} from "@/03_features/PhotoBlock";
import {ControlGrid} from "@/03_features/RowsBlock";
import {PhotosBlock} from "@/03_features/PhotosBlock";
import {usePhotosStore} from "@/05_shared/lib";

type MainProps = {

}

export const Main: React.FC<MainProps> = ({

}) => {

    const {photos} = usePhotosStore()

    return (
        <div className="max-w-screen h-screen bg-mainDark flex white-border relative overflow-hidden">
            {Object.keys(photos).length > 0 && (
                <PhotosBlock/>
            )}
            <div className="flex flex-col flex-1 divide-y-2 divide-solid relative overflow-hidden">
                <div className="flex-1 h-[60%] flex">
                    <PhotoBlock/>
                </div>
                <ContentBlock/>
            </div>
            <ControlGrid/>
        </div>
    );
};