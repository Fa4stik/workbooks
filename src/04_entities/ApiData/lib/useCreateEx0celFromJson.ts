import {useMutation} from "@tanstack/react-query";
import {createExcelFromJsonPost} from "@/04_entities/ApiData/lib/createExcelFromJsonPost";

export const useCreateExcelFromJson = () => useMutation({
    mutationFn: createExcelFromJsonPost,
    onSuccess: ({data}) => {
        const anchor = document.createElement('a')
        document.body.appendChild(anchor)
        anchor.download = 'data'
        const url = URL.createObjectURL(data)
        anchor.href = url
        anchor.click()
        document.removeChild(anchor)
        URL.revokeObjectURL(url)
    }
})