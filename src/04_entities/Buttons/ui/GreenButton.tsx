import React from 'react';
import {Button} from "@mui/material";
import {GreenProvider} from "@/04_entities/Buttons/ui/GreenProvider";

type GreenButtonProps = {
    children: React.ReactNode
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const GreenButton: React.FC<GreenButtonProps> = ({
    children,
    onClick
}) => {
    
    return (
        <GreenProvider>
            <Button onClick={onClick}>
                {children}
            </Button>
        </GreenProvider>
    );
};