import {createStore, del, get, set} from "idb-keyval";
import {StateStorage} from "zustand/middleware";

export const createIndexDbStore = (dbName: string, storageName: string): StateStorage => {
    const indexDBStore = createStore(dbName, storageName)

    return {
        getItem: async (name: string): Promise<string | null> => {
            return (await get(name, indexDBStore)) || null
        },
        setItem: async (name: string, value: string): Promise<void> => {
            await set(name, value, indexDBStore)
        },
        removeItem: async (name: string): Promise<void> => {
            await del(name, indexDBStore)
        },
    }
}