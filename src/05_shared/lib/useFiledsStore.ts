import {create} from "zustand";
import {createJSONStorage, devtools, persist, StateStorage} from "zustand/middleware";
import {ENameField, TFields} from "@/05_shared/model/typesField";
import {initialFields} from '../model/initialFieldStore'
import {createIndexDbStore} from "@/05_shared/lib/indexDBStorage";

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

const storageName = 'useFieldsStore'

const storage = createIndexDbStore(storageName + 'DB', storageName)

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
            }), {
                name: storageName,
                storage: createJSONStorage(() => storage)
            }
        )
    )
)