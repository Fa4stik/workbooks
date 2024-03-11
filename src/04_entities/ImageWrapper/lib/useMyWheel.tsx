import React, {useState} from "react";
import {SpringRef, useSpring} from "react-spring";
import {useWheel} from "@use-gesture/react";
import {updateBounds} from "@/04_entities/ImageWrapper/lib/updateBounds";
import {TBounds} from "@/04_entities/ImageWrapper/model/dragTypes";

type useMyWheelProps = {
    minSizeScaleImg: number,
    maxSizeScaleImg: number,
    scaleFactor: number,
    setIsImmediateDrag: React.Dispatch<React.SetStateAction<boolean>>,
    imgBlockRef: React.RefObject<HTMLDivElement>,
    apiDrag: SpringRef<{ x: number, y: number }>,
    setBounds: React.Dispatch<React.SetStateAction<TBounds>>
    updateBounds: typeof updateBounds
}

export const useMyWheel = ({
    minSizeScaleImg,
    maxSizeScaleImg,
    scaleFactor,
    setIsImmediateDrag,
    imgBlockRef,
    apiDrag,
    updateBounds,
    setBounds,
}: useMyWheelProps) => {

    const [{scale}, apiWheel] =
        useSpring(() => ({scale: 1}))

    const bindWheel = useWheel(({event, delta: [dx, dy]}) => {
        if (dy === 0)
            return

        setIsImmediateDrag(false)
        const {top, left, width, height} =
            imgBlockRef.current!.getBoundingClientRect()
        const {width: parW, height: parH} =
            imgBlockRef.current!.parentElement!.getBoundingClientRect()

        const newScale = scale.get() - dy * scaleFactor;

        const clampedScale = Math.max(minSizeScaleImg, Math.min(newScale, maxSizeScaleImg));

        let lastDeltaX = 0
        let lastDeltaY = 0

        const startOriginX = width / 2
        const startOriginY = height / 2

        const ormOriginX = (event.clientX - left - startOriginX) / scale.get()
        const ormOriginY = (event.clientY - top - startOriginY) / scale.get()

        apiWheel.start({
            scale: clampedScale,
            onChange: (result) => {
                if (ormOriginX !== 0) {
                    const modifyOriginX = (event.clientX - left - startOriginX) / result.value.scale
                    const deltaX = (ormOriginX - modifyOriginX) * result.value.scale

                    const offsetX = deltaX - lastDeltaX
                    const newX = apiDrag.current[0].get().x - offsetX
                    apiDrag.start({x: newX, immediate: true})

                    lastDeltaX = deltaX;
                }

                if (ormOriginY !== 0) {
                    const modifyOriginY = (event.clientY - top - startOriginY) / result.value.scale
                    const deltaY = (ormOriginY - modifyOriginY) * result.value.scale

                    const offsetY = deltaY - lastDeltaY
                    const newY = apiDrag.current[0].get().y - offsetY
                    apiDrag.start({y: newY, immediate: true})

                    lastDeltaY = deltaY
                }

                updateBounds(
                    result.value.scale,
                    [width, height],
                    [parW, parH],
                    setBounds
                )
            },
        });
    }, {
        preventDefault: true
    });

    return {scale, apiWheel, bindWheel}
}