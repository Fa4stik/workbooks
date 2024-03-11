import {TBounds} from "@/04_entities/ImageWrapper/model/dragTypes";

type TDimensions = [
    w: number,
    h: number
]

export const updateBounds = (
    scale: number,
    [origImgW, origImgH]: TDimensions,
    [parW, parH]: TDimensions,
    setBounds: (value: React.SetStateAction<TBounds>) => void,
    isRotate = false
) => {

    // const parSizes = parentRef.current!.getBoundingClientRect();
    // let origImgW = origImgRef.current!.naturalWidth
    // let origImgH = origImgRef.current!.naturalHeight
    let imgSizesW = origImgW * scale
    let imgSizesH = origImgH * scale

    const myOriginX = origImgW / 2
    const myOriginY = origImgH / 2

    // Разница при повороте
    let startX = myOriginX * (scale - 1)
    let startY = myOriginY * (scale - 1)

    if (isRotate) {
        startX -= (imgSizesW - imgSizesH) / 2
        startY += (imgSizesW - imgSizesH) / 2
        imgSizesW = [imgSizesH, imgSizesH = imgSizesW][0]
    }

    if (parW >= imgSizesW) {
        const newRight = (parW - imgSizesW) / 2 + startX
        setBounds(prevState => ({
            ...prevState,
            left: newRight,
            right: newRight
        }))
    }

    if (parW < imgSizesW) {
        const newRight = startX
        const newLeft = startX - (imgSizesW - parW)
        setBounds(prevState => ({
            ...prevState,
            right: newRight,
            left: newLeft
        }))
    }

    if (parH >= imgSizesH) {
        const newBottom = (parH - imgSizesH) / 2 + startY
        setBounds(prevState => ({
            ...prevState,
            bottom: newBottom,
            top: newBottom
        }))
    }

    if (parH < imgSizesH) {
        const newBottom = startY
        const newTop = startY - (imgSizesH - parH)
        setBounds(prevState => ({
            ...prevState,
            bottom: newBottom,
            top: newTop
        }))
    }
}

// const updateBounds = (scale: number) =>
//     currRotate % 180 === 0
//         ? countNewBounds(scale)
//         : countNewBounds(scale, true)