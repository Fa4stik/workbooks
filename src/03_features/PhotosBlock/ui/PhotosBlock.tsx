import React from 'react';
import {usePhotosStore} from "@/05_shared/lib";
import {DropDownMenu, EPhotosActions, TSpecialDialAction} from "@/04_entities/DropDownMenu";
import {photosBlock} from "@/05_shared/ui/icons";

type PhotosBlockProps = {
}

const actions: TSpecialDialAction[] = [
    {icon: <photosBlock.delOne/>, name: EPhotosActions.delCurrent, key: 'delCurrent'},
    {icon: <photosBlock.delAll/>, name: EPhotosActions.delAll, key: 'delAll'}
]

export const PhotosBlock: React.FC<PhotosBlockProps> = ({
}) => {

    const {photos, activePhoto, setActivePhoto, delPhoto} =
        usePhotosStore()

    const handleClickDropDown = (key: keyof typeof EPhotosActions) => {
        if (key === 'delCurrent') {
            delPhoto(activePhoto.photoUid)
        }

        if (key === 'delAll') {
            Object.keys(photos).forEach(photoKey => {
                delPhoto(photoKey)
            })
        }
    }

    return (
        <div className="w-1/6 relative">
            <div className="h-full flex flex-col px-8 py-4 white-border-r rounded-xl gap-6 overflow-y-auto overflow-x-hidden">
                {Object.entries(photos)
                    .map(([photoUid, {path}]) => (
                            <div className={`flex flex-col justify-center items-center select-none`}
                                 key={photoUid}
                                 onClick={() => setActivePhoto(photoUid)}
                            >
                                <img src={path} alt="" className={`rounded-xl ease-in-out transition-all duration-500
                            object-cover w-full
                            ${activePhoto.photoUid === photoUid &&
                                'shadow-lg shadow-sky-200/[0.4]'}`}
                                />
                                <p className="font-inter text-mainWhite">Image №{photoUid}</p>
                            </div>
                        )
                    )
                }
            </div>
            <DropDownMenu actions={actions}
                          onClick={handleClickDropDown}
            />
        </div>
    );
};