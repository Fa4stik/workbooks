import React from 'react';
import {RedProvider} from "@/04_entities/Buttons/ui/RedProvider";
import {Button} from "@mui/material";

type RedButtonProps = {
    children: React.ReactNode
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const RedButton: React.FC<RedButtonProps> = ({
   children,
   onClick
}) => {

    return (
        <RedProvider>
            <Button onClick={onClick}>
                {children}
            </Button>
        </RedProvider>
    );
};