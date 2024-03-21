import React from 'react';
import {DropDownMenuProvider} from "@/04_entities/DropDownMenu/ui/DropDownMenuProvider";
import {photosBlock} from "@/05_shared/ui/icons";
import {SpeedDial, SpeedDialAction} from "@mui/material";
import {EPhotosActions, TSpecialDialAction} from "@/04_entities/DropDownMenu";

type DropDownMenuProps = {
    onClick: (key: keyof typeof EPhotosActions) => void
    actions: TSpecialDialAction[]
}

export const DropDownMenu: React.FC<DropDownMenuProps> = ({
    onClick,
    actions
}) => {

    return (
        <DropDownMenuProvider>
            <SpeedDial ariaLabel={'SpeedDial basic example'}
                       sx={{
                           position: 'absolute',
                           left: '10px',
                           bottom: '10px',
                       }}
                       icon={<photosBlock.plus/>}
            >
                {actions.map(({icon, name, key}) => (
                    <SpeedDialAction icon={icon}
                                     key={name}
                                     onClick={() => onClick(key)}
                                     tooltipTitle={name}
                    />
                ))}
            </SpeedDial>
        </DropDownMenuProvider>
    );
};