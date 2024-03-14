import React, {useEffect, useState} from 'react';
import {WhiteTextField} from "@/04_entities/Inputs";
import {ENameField, ETypeField, useFieldsStore} from "@/05_shared/model";
import {WhiteDatePicker} from "@/04_entities/DatePicker";
import dayjs from "dayjs";
import {BlueButton, GreenButton} from "@/04_entities/Buttons";
import {useWebSpeechRecognition} from "@/04_entities/WebSpeechRecognition";
import {useCreateExcelFromJson} from "@/04_entities/ApiData";

type ContentBlockProps = {}

export const ContentBlock: React.FC<ContentBlockProps> = ({

}) => {

    const {fields, setContent, activePage, activeRow,
        setActiveRow } = useFieldsStore()

    const {isRecognizing, data: speechToTextData, isAvailable,
        startRecognize, stopRecognize} = useWebSpeechRecognition()

    const {mutate} = useCreateExcelFromJson()

    const [isPressedCltr, setIsPressedCltr] =
        useState<boolean>(false)

    useEffect(() => {
        window.onkeydown = e => {
            setIsPressedCltr(e.key === 'Control')
        }

        window.onkeyup = e => {
            setIsPressedCltr(e.key === 'Control' && false)
        }
    }, []);

    useEffect(() => {
        if (!isAvailable)
            return

        if (isPressedCltr) {
            startRecognize()
        }

        if (!isPressedCltr) {
            stopRecognize()
        }
    }, [isPressedCltr]);

    const handleDownloadExcel = () => {
        mutate(fields)
    };

    return (
        <div className="h-[40%] w-full flex flex-col p-[15px] gap-4 relative overflow-auto rounded-xl">
            <div className="flex flex-wrap gap-x-6 gap-y-4">
                {Object.entries(fields[activePage][activeRow]).map(([fKey, field], id, array) =>
                    field.type === ETypeField.Input && (
                        <WhiteTextField label={field.name} key={fKey} id={fKey}
                                        isRecording={isRecognizing}
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
                        <WhiteDatePicker label={field.name} key={fKey+activePage}
                                         onChange={(e) =>
                                             setContent(fKey as keyof typeof ENameField, e?.format('DD.MM.YYYY') ?? '')}
                                         value={dayjs(field.content ?? new Date(), 'DD.MM.YYYY')}
                        />
                ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
                {Object.entries(fields[activePage][activeRow]).map(([fKey, field], id, array) =>
                    field.type === ETypeField.Textarea && (
                        <WhiteTextField label={field.name} key={fKey} multiline
                                        id={fKey}
                                        isRecording={isRecognizing}
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
            <div className="flex justify-end items-end gap-6">
                <GreenButton onClick={handleDownloadExcel}>
                    Выгрузить</GreenButton>
                <BlueButton onClick={() => {
                    setActiveRow(activeRow + 1)
                }}>
                    Следующий</BlueButton>
            </div>
        </div>
    );
};