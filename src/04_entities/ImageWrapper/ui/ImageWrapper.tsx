import React, {useEffect, useRef, useState} from 'react';
import {TBbox} from "@/03_features/PhotoBlock";
import {ImageMask} from "@/04_entities/ImageWrapper/ui/ImageMask";
import {LoadingDotRight} from "@/05_shared/ui/loading";
import {animated} from "react-spring";
import {useMyDrag} from "@/04_entities/ImageWrapper/lib/useMyDrag";
import {useMyWheel} from "@/04_entities/ImageWrapper/lib/useMyWheel";
import {TBounds} from "@/04_entities/ImageWrapper/model/dragTypes";
import {
    MAX_SIZE_SCALE_IMG,
    MIN_SIZE_SCALE_IMG,
    SCALE_FACTOR,
    SPEED_ZOOM
} from "@/04_entities/ImageWrapper/model/constants";
import {updateBounds} from "@/04_entities/ImageWrapper/lib/updateBounds";

type ImageWrapperProps = {
    bboxes: TBbox[],
    srcImg: string,
    onClickBox: (word: string) => void,
    isLoading: boolean
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({
    bboxes,
    srcImg,
    isLoading,
    onClickBox
}) => {

    const [bounds, setBounds] =
        useState<TBounds>({left: 0, right: 0, top: 0, bottom: 0})
    const [minSizeScaleImg, setMinSizeScaleImg] =
        useState<number>(MIN_SIZE_SCALE_IMG)
    const [scaleFactor, setScaleFactor] =
        useState<number>(SCALE_FACTOR)

    // Размеры оригинального изображения
    const origImgRef = useRef<HTMLImageElement>(null)
    // Блок с изображение уже отформатированный с учётом зума
    const imgBlockRef = useRef<HTMLDivElement>(null)
    // Размеры окна, в котором изменяется изображение
    const parentRef = useRef<HTMLDivElement>(null)
    // Размеры изображения без учёта поворота
    const origOffsetRef = useRef<HTMLDivElement>(null)

    // Хук для перемещения изображения
    const {x, y, bindDrag, apiDrag,
    isImmediateDrag, setIsImmediateDrag} =
        useMyDrag({bounds})

    // Хук для изменения размеров изображения
    const {scale, apiWheel, bindWheel} =
        useMyWheel({
            maxSizeScaleImg: MAX_SIZE_SCALE_IMG,
            minSizeScaleImg,
            scaleFactor,
            setIsImmediateDrag,
            imgBlockRef,
            origImgRef,
            parentRef,
            apiDrag,
            setBounds,
            updateBounds
        })

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (origImgRef.current) {
            const width = origImgRef.current.naturalWidth;
            const height = origImgRef.current.naturalHeight;
            const myParSizes = parentRef.current!.getBoundingClientRect()

            imgBlockRef.current!.style.width = `${width}px`;
            imgBlockRef.current!.style.height = `${height}px`;

            // Вычисление scale для конкретного изображения
            const baseSize = Math.max(myParSizes.width, myParSizes.height);
            const normalizedScaleFactor = Math.sqrt((width * height) / baseSize);
            setScaleFactor(SPEED_ZOOM / normalizedScaleFactor);

            if (width > height) {
                const newScale = myParSizes.width / (width*2)
                apiWheel.start({
                    scale: newScale, onResolve: () => {
                        updateBounds(
                            newScale,
                            [width, height],
                            [myParSizes.width, myParSizes.height],
                            setBounds
                        )
                    },
                    immediate: true
                })
                setMinSizeScaleImg(myParSizes.width/2 / width)
            }

            if (width <= height) {
                const newScale = myParSizes.height / (height*2)
                apiWheel.start({
                    scale: newScale, onResolve: () => {
                        updateBounds(
                            newScale,
                            [width, height],
                            [myParSizes.width, myParSizes.height],
                            setBounds
                        )
                    },
                    immediate: true
                })
                setMinSizeScaleImg(myParSizes.height/2 / height)
            }
        }
    }

    // Движение изображения к границам, когда оно от него сильно отходит
    useEffect(() => {
        const {left, top, bottom, right} = bounds

        x.get() > right && apiDrag.start({x: right, immediate: isImmediateDrag})
        x.get() < left && apiDrag.start({x: left, immediate: isImmediateDrag})

        y.get() > bottom && apiDrag.start({y: bottom, immediate: isImmediateDrag})
        y.get() < top && apiDrag.start({y: top, immediate: isImmediateDrag})

    }, [bounds]);

    return (
        <div className="flex-1 flex overflow-hidden relative"
             ref={parentRef}
        >
            {bboxes.length > 0 && (
                <ImageMask bboxes={bboxes}/>
            )}
            {isLoading && (
                <LoadingDotRight/>
            )}
            <animated.div className={'relative'}
                          ref={imgBlockRef}
                          style={{
                              x, y,
                              transform: scale.to(s => `scale(${s})`),
                              touchAction: 'none'
                          }}
                          {...bindDrag()}
                          {...bindWheel()}
            >
                <img src={srcImg}
                     ref={origImgRef}
                     onLoad={handleImageLoad}
                     className="h-full max-h-none max-w-none absolute z-0"
                     alt="MyImg"
                />
            </animated.div>
        </div>
    );
};