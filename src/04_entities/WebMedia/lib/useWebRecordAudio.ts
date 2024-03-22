import {useEffect, useRef, useState} from "react";

export const useWebRecordAudio = () => {
    const [isAvailable, setIsAvailable] =
        useState<boolean>(true)
    const [isRecording, setIsRecording] =
        useState<boolean>(false)
    const [data, setData] =
        useState<Blob>(new Blob())

    const mediaRecorder = useRef<MediaRecorder|null>(null)

    const startRecord = () => {
        if (!mediaRecorder.current)
            return

        mediaRecorder.current?.start()
        setIsRecording(true)
    }

    const stopRecord = () => {
        if (!mediaRecorder.current)
            return

        mediaRecorder.current?.stop()
        setIsRecording(false)
    }

    useEffect(() => {
        if (!navigator.mediaDevices) {
            setIsAvailable(false)
            return;
        }

        navigator.mediaDevices
            .getUserMedia({audio: true})
            .then(stream => {
                mediaRecorder.current = new MediaRecorder(stream)

                mediaRecorder.current.onstart = () => {
                    setIsRecording(true)
                }

                mediaRecorder.current.onstop = () => {
                    setIsRecording(false)
                }

                mediaRecorder.current.ondataavailable = (e) => {
                    setIsRecording(false)
                    const audioBlob = new Blob([e.data], {type: 'audio/wav'})
                    setData(audioBlob)
                }
            })
    }, []);

    return {
        isAvailable, isRecording, data,
        startRecord, stopRecord
    }
}