import React from 'react';
import {Button} from "@mui/material";
import {BlueProvider} from "@/04_entities/Buttons/ui/BlueProvider";

type BlueButtonProps = {
    children: React.ReactNode
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const BlueButton: React.FC<BlueButtonProps> = ({
    children,
    onClick
}) => {

    return (
        <BlueProvider>
            <Button onClick={onClick}>
                {children}
            </Button>
        </BlueProvider>
    );
};