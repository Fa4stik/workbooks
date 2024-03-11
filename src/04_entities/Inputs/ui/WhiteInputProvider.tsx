import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material";

type InputThemeProviderProps = {
    children: React.ReactNode
}

const theme = createTheme({
    components: {
        // Переопределение стилей для всех экземпляров TextField
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
                            borderColor: 'white', // Цвет обводки при фокусе
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
});

export const WhiteInputProvider: React.FC<InputThemeProviderProps> = ({
    children
}) => {
    
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};