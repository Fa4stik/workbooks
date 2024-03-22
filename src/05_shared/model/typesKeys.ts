export enum EKeys {
    ctrl = "ControlLeft",
    shift = "ShiftLeft",
    r = "KeyR",
    p = "KeyP"
}

export type TKeys = {
    [keyCode in EKeys]: {
        isPressed: boolean
    }
}