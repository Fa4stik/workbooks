import {EKeys, TKeys} from "@/05_shared/model";
import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

type State = {
    keys: TKeys
}

type Actions = {
    updateKey: (keyCode: EKeys, isPressed: boolean) => void
}

export const useKeysStore = create<State & Actions>()(
    devtools(
        persist(
            set => ({
                keys: {
                    [EKeys.ctrl]: {
                        isPressed: false
                    },
                    [EKeys.shift]: {
                        isPressed: false
                    },
                    [EKeys.p]: {
                        isPressed: false
                    },
                    [EKeys.r]: {
                        isPressed: false
                    },
                },
                updateKey: (keyCode, isPressed) => set(state => ({
                    keys: {
                        ...state.keys,
                        [keyCode]: {isPressed}
                    }
                }))
            }), {name: 'useKeysStore'}
        )
    )
)