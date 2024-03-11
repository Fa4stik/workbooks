import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {ENameField, TFields} from "@/05_shared/model/typesField";
import {initialFields} from './initialFieldStore'

type State = {
    activePage: number
    activeRow: number
    fields: TFields[][] // rows[] <-- pages[]
}

type Actions = {
    setContent: (id: keyof typeof ENameField, content: string) => void
    setActivePage: (activePage: number) => void
    setActiveRow: (activeRow: number) => void
}

export const useFieldsStore = create<State & Actions>()(
    devtools(
        persist(
            set => ({
                activePage: 0,
                activeRow: 0,
                fields: [
                    [JSON.parse(JSON.stringify(initialFields))]
                ],
                setContent: (id, content) => set(state => {
                    const updateFields = [...state.fields]
                    const {activePage, activeRow} = state
                    updateFields[activePage][activeRow][id].content = content
                    return {fields: updateFields}
                }),
                setActivePage: (activePage) => set((state) => activePage >= state.fields.length
                    ? {fields: [...state.fields, [JSON.parse(JSON.stringify(initialFields))]], activePage, activeRow: 0}
                    : {activePage}
                ),
                setActiveRow: (activeRow) => set((state) => {
                    const {activePage, fields} = state
                    if (activeRow < fields[activePage].length)
                        return {activeRow}

                    const updateFields = [...state.fields]
                    updateFields[activePage].push(JSON.parse(JSON.stringify(initialFields)))
                    return {updateFields, activeRow}
                }),
            }), {name: 'useFieldsStore'}
        )
    )
)