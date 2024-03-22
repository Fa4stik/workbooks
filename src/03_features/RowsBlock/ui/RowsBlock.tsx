import React, {useEffect} from 'react';
import {rowsBlock} from "@/05_shared/ui/icons";
import {useFieldsStore} from "@/05_shared/lib";

type RowsBlockProps = {
    title: string
    activeId: number
    indexes: Array<number>
    setPage?: (page: number) => void
    setRow: (row: number) => void
    addGrid: () => void
    delRow: (page: number, row: number) => void
    delPage?: (page: number) => void
}

export const RowsBlock: React.FC<RowsBlockProps> = ({
    title,
    indexes,
    setRow,
    setPage,
    addGrid,
    activeId,
    delRow,
    delPage
}) => {

    const {activePage} = useFieldsStore()

    return (
        <div className="flex-grow flex flex-col justify-start text-mainWhite text-center
        font-inter font-semibold text-sm divide-y-2 divide-solid">
            <span className="p-1">{title}</span>
            {indexes.map(index => (
                <div key={index + title} className={`flex items-center justify-center relative cursor-pointer
                ${activeId === index && 'bg-mainWhite/[0.3]'}`}
                     onClick={() => {
                         if (setPage) {
                             setPage(index)
                             setRow(0)
                             return
                         }

                         setRow(index)
                     }}
                >
                    <button>
                        {index + 1}
                    </button>
                    {index === activeId && (
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 cursor-no-drop"
                                onClick={(e) => {
                                    e.stopPropagation()

                                    if (delPage) {
                                        delPage(activePage)
                                        setRow(0)
                                        return
                                    }

                                    delRow(activePage, index)
                                }
                        }
                        >
                            <rowsBlock.del color={'#FF6565'} opacity={'0.8'}/>
                        </button>
                    )}
                </div>
            ))}
            {/*setGrid(indexes.length)*/}
            <button className="flex items-center justify-center py-2"
                    onClick={addGrid}
            >
                <rowsBlock.add/>
            </button>
        </div>
    );
};