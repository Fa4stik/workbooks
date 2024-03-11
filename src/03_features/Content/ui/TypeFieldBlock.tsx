import React from 'react';
import {ENameField, ETypeField, TFields} from "@/05_shared/model";
import {WhiteTextField} from "@/04_entities/Inputs";

type TypeFieldBlockProps = {
    fields: TFields
    type: ETypeField
    children: React.ReactNode
}

export const TypeFieldBlock: React.FC<TypeFieldBlockProps> = ({
    children,
    fields,
    type
}) => {

    return (
        <div className="flex flex-wrap gap-x-6 gap-y-4">
            {Object.entries(fields).map(([fKey, field]) => field.type === ETypeField.Input && (
                <WhiteTextField label={field.name} key={fKey}
                                value={field.content ?? ''}
                                onChange={(e) =>
                                    console.log(e)}
                />
            ))}
        </div>
    );
};