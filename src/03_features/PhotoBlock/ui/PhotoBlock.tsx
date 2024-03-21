import React, {useEffect, useState} from 'react';
import {ImageWrapper} from "@/04_entities/ImageWrapper";
import {mockImages} from "@/05_shared/mock";
import {EmptyImage} from "@/03_features/PhotoBlock";
import {TActivePhoto, TChunks} from "@/05_shared/model";
import {usePhotosStore} from "@/05_shared/lib";

type PhotoBlockProps = {
}

export const PhotoBlock: React.FC<PhotoBlockProps> = ({
}) => {

    const {activePhoto, photos, setActivePhoto} =
        usePhotosStore()

    useEffect(() => {
        if (!('photoUid' in activePhoto) && Object.keys(photos).length > 0) {
            const chunkUid = Object.keys(photos)[0]
            const photoUid = Object.keys(photos[chunkUid])[0]
            setActivePhoto({
                photoUid,
                chunkUid
            })
        }
    }, [photos]);

    if (Object.keys(photos).length <= 0)
        return (
            <EmptyImage/>
        )

    return (
        <ImageWrapper bboxes={[]} srcImg={photos[activePhoto.chunkUid][activePhoto.photoUid].path}
                      onClickBox={(word) => console.log(word)}
                      isLoading={false}/>
    );
};