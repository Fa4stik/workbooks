import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material";

type GreenProviderProps = {
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
                    borderColor: '#398F56',
                    color: '#398F56',
                    '&:hover': {
                        borderColor: '#398F56',
                        backgroundColor: 'rgba(179, 199, 250, 0.04)', // Небольшой эффект при наведении
                    },
                },
            }
        }
    }
})

export const GreenProvider: React.FC<GreenProviderProps> = ({
    children
}) => {
    
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};