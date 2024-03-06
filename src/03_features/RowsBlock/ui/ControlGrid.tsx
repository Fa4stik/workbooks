import React from 'react';
import {RowsBlock} from "@/03_features/RowsBlock";
import {useFieldsStore} from "@/05_shared/model";

type ControlGridProps = {}

export const ControlGrid: React.FC<ControlGridProps> = ({

}) => {

    const {fields, setActivePage, setActiveRow, activePage} = useFieldsStore()

    return (
        <div className="flex w-1/6 white-border-l divide-x-2 divide-solid">
            <RowsBlock title={'Номер строки'} indexes={fields[activePage].map((_, id) => id+1)}/>
            <RowsBlock title={'Номер листа'} indexes={fields.map((_, id) => id+1)} />
        </div>
    );
};