import {useEffect, useRef, useState} from "react";

export const useWebSpeechRecognition = () => {
    const [isAvailable, setIsAvailable] =
        useState<boolean>(true)
    const [isRecognizing, setIsRecognizing] =
        useState<boolean>(false)
    const [data, setData] =
        useState<string>('')
    const recognition = useRef<SpeechRecognition|null>(null)

    const startRecognize = () => {
        if (!recognition.current)
            return
        recognition.current?.stop()
        setData('')
        setIsRecognizing(true)
        recognition.current?.start()
    }

    const stopRecognize = () => {
        if (!recognition.current)
            return
        setIsRecognizing(false)
        recognition.current?.stop()
    }

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setIsAvailable(false)
            return
        }

        recognition.current = new SpeechRecognition()
        recognition.current.lang = 'ru-RU'
        recognition.current.onresult = e => {
            setIsRecognizing(false)
            setData(e.results[0][0].transcript)
            recognition.current?.stop()
        }
    }, []);

    return {
        isRecognizing, isAvailable, data,
        startRecognize, stopRecognize
    }
}