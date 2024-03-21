import {useMutation} from "@tanstack/react-query";
import {uploadFiles} from "@/04_entities/ApiData/lib/uploadFiles";
import {useState} from "react";

export const useUploadFiles = () => {
    const [paths, setPaths] =
        useState<string[]>([])

    const {mutate, ...rest} = useMutation({
        mutationFn: uploadFiles,
        mutationKey: ['chunk'],
        onSuccess: ({data}) => {
            if (!data)
                return

            setPaths(data.map(path => (process.env.REACT_APP_SERVER_PATH ?? window.origin) + path))
        }
    })

    return {mutate, paths, rest}
}