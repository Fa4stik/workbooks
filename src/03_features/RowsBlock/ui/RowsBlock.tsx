import React from 'react';
import {rowsBlock} from "@/05_shared/ui/icons";

type RowsBlockProps = {
    title: string
    activeId: number
    indexes: Array<number>
    setGrid: (grid: number) => void
    addGrid: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const RowsBlock: React.FC<RowsBlockProps> = ({
    title,
    indexes,
    setGrid,
    addGrid,
    activeId
}) => {

    return (
        <div className="flex-grow flex flex-col justify-start text-mainWhite text-center
        font-inter font-semibold text-sm divide-y-2 divide-solid">
            <span className="p-1">{title}</span>
            {indexes.map(index => (
                // setGrid(index)
                <button className={`flex items-center justify-center
                ${activeId === index && 'bg-mainWhite/[0.3]'}`} key={index+title}
                     onClick={() => setGrid(index)}
                >
                    {index+1}
                </button>
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