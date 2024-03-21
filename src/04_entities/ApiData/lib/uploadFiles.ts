import {$api} from "@/05_shared/api";
import axios, {AxiosResponse} from 'axios';

const generateFormData = (files: ArrayLike<File>): Promise<FormData> =>
    new Promise((resolve) => {
        const formData = new FormData()
        Array.from(files).forEach((file, id, array) => {
            formData.append('files', file)
            if ((id + 1) === array.length)
                resolve(formData)
        })

    })

type TUplodFilesProps = {
    chunk_id: number,
    files: ArrayLike<File>
}

export const uploadFiles = ({files, chunk_id}: TUplodFilesProps) => {
    const formData = new FormData()
    Array.from(files).forEach(file => {
        formData.append('files', file)
    })
    return $api.post<string[]>('/upload-files/?' + new URLSearchParams({chunk_id: chunk_id.toString()}),
        formData)
}

// export const uploadFiles = (chunk_id: number, files: ArrayLike<File>) =>
//     new Promise((resolve) => {
//         generateFormData(files)
//             .then(formData => resolve(
//                 $api.post<string[]>('/upload-files/' + new URLSearchParams({chunk_id: chunk_id.toString()}),
//                     formData)
//             ))
//     })