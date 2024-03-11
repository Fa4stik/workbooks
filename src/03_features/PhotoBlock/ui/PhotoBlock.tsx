import React from 'react';
import {ImageWrapper} from "@/04_entities/ImageWrapper";
import {mockImages} from "@/05_shared/mock";
import {EmptyImage} from "@/03_features/PhotoBlock";

type PhotoBlockProps = {}

export const PhotoBlock: React.FC<PhotoBlockProps> = ({

}) => {

    return (
        <div className="w-full h-[60%] flex">
            {/*<EmptyImage/>*/}
            <ImageWrapper bboxes={[]} srcImg={mockImages.image1}
                          onClickBox={(word) => console.log(word)}
                          isLoading={false}/>
        </div>
    );
};