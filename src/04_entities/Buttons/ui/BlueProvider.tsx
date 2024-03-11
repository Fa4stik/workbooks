import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material";

type BlueProviderProps = {
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
                    borderColor: '#B3C7FA',
                    color: '#B3C7FA',
                    '&:hover': {
                        borderColor: '#B3C7FA',
                        backgroundColor: 'rgba(179, 199, 250, 0.04)', // Небольшой эффект при наведении
                    },
                },
            }
        }
    }
})

export const BlueProvider: React.FC<BlueProviderProps> = ({
    children
}) => {
    
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};