import {useSpring} from "react-spring";
import {useDrag} from "@use-gesture/react";
import {TBounds} from "../model/dragTypes";
import {useState} from "react";

type useMyDragProps = {
    bounds: TBounds
}

export const useMyDrag = ({
    bounds
}: useMyDragProps) => {

    const [isImmediateDrag, setIsImmediateDrag] =
        useState<boolean>(true)

    const [{x, y}, apiDrag] =
        useSpring(() => (
            {x: 0, y: 0}))

    const bindDrag = useDrag(({
                                  down,
                                  offset: [ox, oy]
                              }) => {
        apiDrag.start({x: ox, y: oy, immediate: down})
    }, {
        bounds, eventOptions: {capture: true},
        preventDefault: true,
        rubberband: true, from: () => [x.get(), y.get()]
    })

    return {x, y, bindDrag, apiDrag,
        isImmediateDrag, setIsImmediateDrag}
}