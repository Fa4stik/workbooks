import React, {useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import {WhiteInputProvider} from "@/04_entities/Inputs/ui/WhiteInputProvider";
import {ENameField, useFieldsStore} from "@/05_shared/model";

type WhiteTextFieldProps = {
    id: string
    multiline?: boolean
    width?: string
    minRows?: number
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    isRecording: boolean
    dataRecognize: string
    fKey: keyof typeof ENameField,
    nextId?: string
}

export const WhiteTextField: React.FC<WhiteTextFieldProps> = ({
    id,
    label,
    onChange,
    value,
    minRows,
    multiline,
    width,
    isRecording,
    dataRecognize,
    fKey,
    nextId
}) => {

    const [borderFocusColor, setBorderFocusColor] =
        useState<string>('white')
    const [isFocus, setIsFocus] =
        useState<boolean>(false)

    const {setContent} = useFieldsStore()

    useEffect(() => {
        if (isFocus && dataRecognize) {
            setContent(fKey, dataRecognize)
            nextId &&
                document.getElementById(nextId)?.focus()
        }

        if (!isRecording && isFocus) {
            setBorderFocusColor('white')
            return
        }

        if (isRecording && isFocus) {
            setBorderFocusColor('orange')
        }

    }, [isRecording, dataRecognize]);

    return (
        <WhiteInputProvider borderFocusColor={borderFocusColor}>
            <TextField label={label} multiline={multiline}
                       sx={{width}}
                       id={id}
                       onChange={onChange}
                       minRows={minRows}
                       value={value}
                       onFocus={() => {
                           setIsFocus(true)
                       }}
                       onBlur={() => {
                           setBorderFocusColor('white')
                           setIsFocus(false)
                       }}
            />
        </WhiteInputProvider>
    );
};