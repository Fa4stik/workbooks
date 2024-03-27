import React, {useEffect} from 'react';
import {RowsBlock} from "@/03_features/RowsBlock/ui/RowsBlock";
import {useFieldsStore, useKeysStore} from "@/05_shared/lib";

type ControlGridProps = {}

export const ControlGrid: React.FC<ControlGridProps> = ({

}) => {

    const {fields, setActivePage, setActiveRow, copyRowById, copyPageById,
        activePage, activeRow, delPageById, delRowById} =
        useFieldsStore()

    const {keys: {ShiftLeft, KeyR, KeyP}} =
        useKeysStore()

    useEffect(() => {
        if (ShiftLeft.isPressed && KeyR.isPressed) {
            copyRowById(activePage, activeRow)
        }

        if (ShiftLeft.isPressed && KeyP.isPressed) {
            copyPageById(activePage)
        }
    }, [ShiftLeft, KeyR, KeyP]);

    return (
        <div className="flex w-1/6 white-border-l rounded-xl divide-x-2 divide-solid select-none">
            <RowsBlock title={'Номер строки'}
                       tip={'Для дублирования текущей строки нажмите Shift + R'}
                       setRow={setActiveRow}
                       activeId={activeRow}
                       delRow={delRowById}
                       addGrid={() => {
                           setActiveRow(fields[activePage].length)
                       }}
                       indexes={fields[activePage].map((_, id) => id)}/>
            <RowsBlock title={'Номер листа'}
                       tip={'Для дублирования текущего листа нажмите Shift + P'}
                       activeId={activePage}
                       setPage={setActivePage}
                       delPage={delPageById}
                       setRow={setActiveRow}
                       delRow={delRowById}
                       addGrid={() => {
                           setActiveRow(0)
                           setActivePage(fields.length)
                       }}
                       indexes={fields.map((_, id) => id)} />
        </div>
    );
};