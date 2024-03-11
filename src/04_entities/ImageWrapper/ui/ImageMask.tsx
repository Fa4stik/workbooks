import React from 'react';
import {TBbox} from "@/03_features/PhotoBlock";

type ImageMaskProps = {
    bboxes: TBbox[]
}

export const ImageMask: React.FC<ImageMaskProps> = ({
    bboxes
}) => {
    
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             xmlnsXlink="http://www.w3.org/1999/xlink"
             style={{position: 'absolute',}}>
            <defs>
                <clipPath id="contentMask">
                    {bboxes.map((box, id) => (
                        <rect key={id}
                              x={box.x}
                              y={box.y}
                              width={box.w}
                              height={box.h}
                              rx="5"
                        />
                    ))}
                </clipPath>
            </defs>
        </svg>
    );
};