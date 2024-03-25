import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material";

type WhiteDateProviderProps = {
    children: React.ReactNode
}

const theme = createTheme(
    {
        palette: {
          mode: "dark"
        },
    }
)

export const WhiteDateProvider: React.FC<WhiteDateProviderProps> = ({
    children
}) => {

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};