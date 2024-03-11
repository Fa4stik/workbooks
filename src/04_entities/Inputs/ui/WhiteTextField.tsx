import React from 'react';
import {TextField} from "@mui/material";
import {WhiteInputProvider} from "@/04_entities/Inputs/ui/WhiteInputProvider";

type WhiteTextFieldProps = {
    multiline?: boolean
    width?: string
    minRows?: number
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const WhiteTextField: React.FC<WhiteTextFieldProps> = ({
    label,
    onChange,
    value,
    minRows,
    multiline,
    width
}) => {

    return (
        <WhiteInputProvider>
            <TextField label={label} multiline={multiline}
                       sx={{width}}
                       onChange={onChange}
                       minRows={minRows}
                       value={value}
            />
        </WhiteInputProvider>
    );
};