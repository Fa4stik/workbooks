import React, {useEffect, useState} from 'react';
import {ImageWrapper} from "@/04_entities/ImageWrapper";
import {mockImages} from "@/05_shared/mock";
import {EmptyImage} from "@/03_features/PhotoBlock";
import {TActivePhoto, TChunks} from "@/05_shared/model";

type PhotoBlockProps = {
    photos: TChunks
    setPhotos: React.Dispatch<React.SetStateAction<TChunks>>
    activePhoto: TActivePhoto
    setActivePhoto: React.Dispatch<React.SetStateAction<TActivePhoto>>
}

export const PhotoBlock: React.FC<PhotoBlockProps> = ({
    activePhoto,
    photos,
    setActivePhoto,
    setPhotos
}) => {

    const [srcImg, setSrcImg] =
        useState<string>('')

    useEffect(() => {
        setSrcImg(photos[activePhoto?.chunkUid]?.[activePhoto?.photoUid]?.path)
    }, [activePhoto]);

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
            <EmptyImage activePhoto={activePhoto}
                        photos={photos}
                        setActivePhoto={setActivePhoto}
                        setPhotos={setPhotos}
            />
        )

    return (
        <ImageWrapper bboxes={[]} srcImg={srcImg}
                      onClickBox={(word) => console.log(word)}
                      isLoading={false}/>
    );
};