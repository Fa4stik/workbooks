import React from "react";

export enum EPhotosActions {
    delCurrent = 'Удалить текущую',
    delAll = 'Удалить все'
}

export type TSpecialDialAction = {
    icon: React.ReactNode,
    name: EPhotosActions,
    key: keyof typeof EPhotosActions
}