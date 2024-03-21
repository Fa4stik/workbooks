import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material";

type DropDownMenuProviderProps = {
    children: React.ReactNode
}

const theme = createTheme({
    components: {
        MuiSpeedDial: {
            styleOverrides: {
                fab: {
                    background: 'linear-gradient(146deg, #398f56 0%, #b3c7fa 100%)',
                    '&:hover': {
                        background: 'linear-gradient(146deg, #398f56 0%, #b3c7fa 100%)',
                        opacity: 0.9,
                    }
                }
            }
        }
    }
})

export const DropDownMenuProvider: React.FC<DropDownMenuProviderProps> = ({
    children
}) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};