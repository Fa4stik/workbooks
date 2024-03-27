import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material";

type RedProviderProps = {
    children: React.ReactNode
}

const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                variant: "outlined",
                size: 'medium'
            },
            styleOverrides: {
                outlined: {
                    borderColor: '#dc647e',
                    color: '#DC647EFF',
                    '&:hover': {
                        borderColor: '#DC647EFF',
                        backgroundColor: 'rgba(179, 199, 250, 0.04)', // Небольшой эффект при наведении
                    },
                },
            }
        }
    }
})

export const RedProvider: React.FC<RedProviderProps> = ({
    children
}) => {

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};