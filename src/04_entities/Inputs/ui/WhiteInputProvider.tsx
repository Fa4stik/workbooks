import React, {useEffect, useMemo} from 'react';
import {createTheme, ThemeProvider} from "@mui/material";

type InputThemeProviderProps = {
    children: React.ReactNode
    borderFocusColor: string
}

const useCustomTheme = (borderFocusColor: string) => useMemo(() => createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'small',
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white', // Установка цвета обводки
                        },
                        '&:hover fieldset': {
                            borderColor: 'white', // Цвет обводки при наведении
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: borderFocusColor, // Динамический цвет обводки при фокусе
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: 'white', // Цвет текста, введенного пользователем
                    },
                    '& .MuiInputLabel-outlined': {
                        color: 'grey', // Цвет лейбла до фокуса
                    },
                    '& .MuiInputLabel-outlined.Mui-focused': {
                        color: 'white', // Цвет лейбла при фокусе
                    },
                },
            },
        },
    },
}), [borderFocusColor]); // Пересоздавать тему только при изменении borderFocusColor

export const WhiteInputProvider: React.FC<InputThemeProviderProps> = ({
    children,
    borderFocusColor
}) => {

    const theme = useCustomTheme(borderFocusColor)

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};