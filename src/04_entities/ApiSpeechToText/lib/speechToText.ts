import {$api} from "@/05_shared/api";

type speechToTextResponse = {
    result: Array<string>
}

export const speechToText = (mediaContent: Blob) => {
    const formData = new FormData()
    formData.append('audio', mediaContent, "audio_record.wav")
    return $api.post<speechToTextResponse>('/speech2text/predict', formData)
}