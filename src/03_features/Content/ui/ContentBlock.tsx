import React from 'react';
import {WhiteTextField} from "@/04_entities/Inputs";
import {ENameField, ETypeField, useFieldsStore} from "@/05_shared/model";
import {WhiteDatePicker} from "@/04_entities/DatePicker";
import dayjs from "dayjs";
import {BlueButton, GreenButton} from "@/04_entities/Buttons";

type ContentBlockProps = {}

type TContentInput = {
    id: string
    name: string
    content?: string
}

export const ContentBlock: React.FC<ContentBlockProps> = ({

}) => {

    const {fields, setContent, activePage, activeRow} = useFieldsStore()

    return (
        <div className="h-[40%] w-full flex flex-col p-[15px] gap-4 relative overflow-auto rounded-xl">
            <div className="flex flex-wrap gap-x-6 gap-y-4">
                {Object.entries(fields[activePage][activeRow]).map(([fKey, field]) => field.type === ETypeField.Input && (
                    <WhiteTextField label={field.name} key={fKey}
                                    value={field.content ?? ''}
                                    onChange={(e) => {
                                        console.log('change')
                                        setContent(fKey as keyof typeof ENameField, e.target.value)
                                    }}
                    />
                ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
                {Object.entries(fields[activePage][activeRow]).map(([fKey, field]) => field.type === ETypeField.Date && (
                    <WhiteDatePicker label={field.name} key={fKey}
                                     onChange={(e) =>
                                         setContent(fKey as keyof typeof ENameField, e?.format('DD.MM.YYYY') ?? '')}
                                     value={dayjs(field.content ?? new Date(), 'DD.MM.YYYY')}
                    />
                ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
                {Object.entries(fields[activePage][activeRow]).map(([fKey, field]) => field.type === ETypeField.Textarea && (
                    <WhiteTextField label={field.name} key={fKey} multiline
                                    width={'33%'} minRows={3}
                                    value={field.content ?? ''}
                                    onChange={(e) =>
                                        setContent(fKey as keyof typeof ENameField, e.target.value)}
                    />
                ))}
            </div>
            <div className="flex justify-end items-end gap-6">
                <GreenButton onClick={() => console.log(fields)}>
                    Выгрузить</GreenButton>
                <BlueButton onClick={() => console.log('next')}>
                    Следующий</BlueButton>
            </div>
        </div>
    );
};