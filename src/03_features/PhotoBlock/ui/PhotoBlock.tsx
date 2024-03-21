import React, {useEffect} from 'react';
import {ImageWrapper} from "@/04_entities/ImageWrapper";
import {EmptyImage} from "@/03_features/PhotoBlock";
import {usePhotosStore} from "@/05_shared/lib";

type PhotoBlockProps = {
}

export const PhotoBlock: React.FC<PhotoBlockProps> = ({
}) => {

    const {activePhoto, photos, setActivePhoto} =
        usePhotosStore()

    if (Object.keys(photos).length <= 0)
        return (
            <EmptyImage/>
        )

    return (
        <ImageWrapper bboxes={[]} srcImg={photos[activePhoto.photoUid].path}
                      onClickBox={(word) => console.log(word)}
                      isLoading={false}/>
    );
};