import React from 'react';
import {useFieldsStore} from "@/05_shared/model";
import {RowsBlock} from "@/03_features/RowsBlock/ui/RowsBlock";

type ControlGridProps = {}

export const ControlGrid: React.FC<ControlGridProps> = ({

}) => {

    const {fields, setActivePage, setActiveRow, activePage, activeRow} = useFieldsStore()

    return (
        <div className="flex w-1/6 white-border-l rounded-xl divide-x-2 divide-solid bg-mainDark">
            <RowsBlock title={'Номер строки'}
                       setGrid={setActiveRow}
                       activeId={activeRow}
                       addGrid={(e) => {
                           setActiveRow(fields[activePage].length)
                       }}
                       indexes={fields[activePage].map((_, id) => id)}/>
            <RowsBlock title={'Номер листа'}
                       activeId={activePage}
                       setGrid={(page) => {
                           setActiveRow(0)
                           setActivePage(page)
                       }}
                       addGrid={(e) => {
                           setActiveRow(0)
                           setActivePage(fields.length)
                       }}
                       indexes={fields.map((_, id) => id)} />
        </div>
    );
};