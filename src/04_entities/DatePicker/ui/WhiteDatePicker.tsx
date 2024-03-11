import React from 'react';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { ruRU } from '@mui/x-date-pickers/locales';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import {WhiteDateProvider} from "@/04_entities/DatePicker/ui/WhiteDateProvider";

type WhiteDatePickerProps = {
    label: string
    value: dayjs.Dayjs
    onChange: (e: dayjs.Dayjs | null) => void
}

export const WhiteDatePicker: React.FC<WhiteDatePickerProps> = ({
    label,
    value,
    onChange
}) => {

    return (
        <WhiteDateProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}
                                  adapterLocale="ru"
            >
                    <DatePicker
                        label={label}
                        onChange={onChange}
                        defaultValue={value}
                    />
            </LocalizationProvider>
        </WhiteDateProvider>
    );
};