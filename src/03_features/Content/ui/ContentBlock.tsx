import React, {useEffect, useRef, useState} from 'react';
import {WhiteTextField} from "@/04_entities/Inputs";
import {ENameField, ETypeField, TActivePhoto, TFields} from "@/05_shared/model";
import {WhiteDatePicker} from "@/04_entities/DatePicker";
import dayjs from "dayjs";
import {BlueButton, GreenButton, RedButton} from "@/04_entities/Buttons";
import {useCreateExcelFromJson} from "@/04_entities/ApiData";
import {useWebRecordAudio, useWebSpeechRecognition} from "@/04_entities/WebMedia";
import {useSpeechToText} from "@/04_entities/ApiSpeechToText";
import {useFieldsStore, useKeysStore, usePhotosStore} from "@/05_shared/lib";
import {TPhoto} from "@/05_shared/model/typesPhotos";

type ContentBlockProps = {}

type TContent = {
    useFieldStore: {
        fields: TFields[][]
        activeRow: number,
        activePage: number
    },
    usePhotoStore: {
        photos: TPhoto,
        activePhoto: TActivePhoto
    }
}

export const ContentBlock: React.FC<ContentBlockProps> = ({

}) => {

    const {fields, setContent, activePage, activeRow,
        setActiveRow, resetFields, importContent: importFields } = useFieldsStore()
    const {photos, activePhoto, setActivePhoto, importContent: importPhotos} =
        usePhotosStore()
    const {keys: {ControlLeft}} =
        useKeysStore()

    // const {isRecognizing, data: speechToTextData, isAvailable,
    //     startRecognize, stopRecognize} = useWebSpeechRecognition()

    const {isAvailable, isRecording, data: audioBlob,
        stopRecord, startRecord} = useWebRecordAudio()

    const {mutate: mutateConvertToExcel} = useCreateExcelFromJson()
    const {mutate: mutateSpeechToText, data: dataSpeechToText,
        isSuccess: isSuccessSpeechToText} =
        useSpeechToText()

    const inputImportRef =
        useRef<HTMLInputElement>(null)

    const [speechToTextData, setSpeechToTextData] =
        useState<string>('')

    useEffect(() => {
        if (!isAvailable)
            return

        if (!isRecording && ControlLeft.isPressed) {
            // startRecognize()
            startRecord()
        }

        if (!ControlLeft.isPressed) {
            // stopRecognize()
            stopRecord()
        }
    }, [ControlLeft]);

    useEffect(() => {
        if (audioBlob.size <= 0)
            return

        mutateSpeechToText(audioBlob)
    }, [audioBlob]);

    useEffect(() => {
        if (!dataSpeechToText)
            return

        if (!isSuccessSpeechToText)
            return;

        setSpeechToTextData(dataSpeechToText.data.result.join(''))

        setTimeout(() => {
            setSpeechToTextData('')
        }, 500)

    }, [isSuccessSpeechToText]);

    const handleDownloadExcel = () => {
        mutateConvertToExcel(fields)
    };

    const handleExportContent = () => {
        const content: TContent = {
            useFieldStore: {
                fields,
                activeRow,
                activePage
            },
            usePhotoStore: {
                photos,
                activePhoto
            }
        }

        const anchor = document.createElement('a')
        anchor.download = 'exportContent'
        const url = URL.createObjectURL(new Blob([JSON.stringify(content)], {type: 'application/json'}))
        anchor.href = url
        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)
        URL.revokeObjectURL(url)
    };

    const handleImportContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length !== 1)
            return

        e.target.files[0]
            .text()
            .then(textFromJSON => {
                const {useFieldStore, usePhotoStore} =
                    JSON.parse(textFromJSON) as TContent
                importFields(useFieldStore)
                importPhotos(usePhotoStore)
            })
    };

    return (
        <div className="h-[40%] w-full flex flex-col p-[15px] gap-4 relative overflow-auto rounded-xl">
            <div className="flex flex-wrap gap-x-6 gap-y-4">
                {Object.entries(fields[activePage][activeRow]).map(([fKey, field], id, array) =>
                    field.type === ETypeField.Input && (
                        <WhiteTextField label={field.name} key={fKey+activeRow+activePage} id={fKey}
                                        // isRecording={isRecognizing}
                                        isRecording={isRecording}
                                        value={field.content ?? ''}
                                        fKey={fKey as keyof typeof ENameField}
                                        dataRecognize={speechToTextData}
                                        nextId={array
                                            .slice(id+1)
                                            .find(([_, inField]) => inField.type === ETypeField.Input)
                                            ?.[0]
                                        }
                                        onChange={(e) => {
                                            setContent(fKey as keyof typeof ENameField, e.target.value)
                                        }}
                        />
                ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
                {Object.entries(fields[activePage][activeRow]).map(([fKey, field]) =>
                    field.type === ETypeField.Date && (
                        <WhiteDatePicker label={field.name} key={fKey+activeRow+activePage}
                                         onChange={(e) =>
                                             setContent(fKey as keyof typeof ENameField, e?.format('DD.MM.YYYY') ?? '')}
                                         value={dayjs(field.content ?? new Date(), 'DD.MM.YYYY')}
                        />
                ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
                {Object.entries(fields[activePage][activeRow]).map(([fKey, field], id, array) =>
                    field.type === ETypeField.Textarea && (
                        <WhiteTextField label={field.name} key={fKey+activeRow+activePage} multiline
                                        id={fKey}
                                        // isRecording={isRecognizing}
                                        isRecording={isRecording}
                                        width={'33%'} minRows={3}
                                        nextId={array
                                            .slice(id+1)
                                            .find(([_, inField]) => inField.type === ETypeField.Textarea)
                                            ?.[0]
                                        }
                                        fKey={fKey as keyof typeof ENameField}
                                        value={field.content ?? ''}
                                        dataRecognize={speechToTextData}
                                        onChange={(e) =>
                                            setContent(fKey as keyof typeof ENameField, e.target.value)}
                        />
                ))}
            </div>
            <div className="flex justify-between">
                <div className="flex justify-start items-start gap-6">
                    <RedButton onClick={handleExportContent}>
                        Экспорт</RedButton>
                    <input type="file" ref={inputImportRef} onChange={handleImportContent}
                           className="hidden" accept="application/json"/>
                    <BlueButton onClick={() => inputImportRef.current && inputImportRef.current.click()}>
                        Импорт</BlueButton>
                </div>
                <div className="flex justify-end items-end gap-6">
                    <GreenButton onClick={handleDownloadExcel}>
                        Выгрузить</GreenButton>
                    <BlueButton onClick={() => {
                        resetFields()
                    }}>
                        Новый документ</BlueButton>
                </div>
            </div>
        </div>
    );
};