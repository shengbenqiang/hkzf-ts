import React, { ReactNode, useState } from "react";
import { FilterMoreType, basePicker } from "../../../untils/types"
import PickerFooter from "../PickerFooter";
import "./FilterMore.css";

const FilterMore = (props: FilterMoreType) => {

    const [ moreSelected, setMoreSelected ] = useState<string[]>(props.defaultValue)

    const handleTagClick = (key: string) => {
        const newMoreSelected = [...moreSelected]
        if (newMoreSelected.indexOf(key as never) <= -1) {
            newMoreSelected.push(key as never)
        } else {
            const index = newMoreSelected.findIndex((item) => item === key)
            newMoreSelected.splice(index, 1)
        }
        setMoreSelected(newMoreSelected)
    }

    const onCancel = () => {
        setMoreSelected([])
    }

    const renderItemTag = (renderData: basePicker[]): ReactNode => {
        return (
            renderData.map((itemTag) => {
                const selected = moreSelected.indexOf(itemTag.value as never) > -1
                return (
                    <div
                        className={`filter-item-type-item-tag-con ${ selected ? 'filter-selected-item-tag' : '' }`}
                        key={itemTag.value}
                        onClick={() => handleTagClick(itemTag.value)}
                    >
                        { itemTag.label }
                    </div>
                )
            })
        )
    }

    return (
        <div className={"filter-more-con"}>
            <div className={"filter-more-mask"} onClick={props.onCancel}></div>
            <div className={"filter-more-type-room"}>
                <div className={"filter-more-type-item-con"}>
                    <div className={"filter-more-common-type-con"}>
                        <div className={"filter-item-type-title"}>户型</div>
                        <div className={"filter-item-type-tag-con"}>
                            { renderItemTag(props.roomType) }
                        </div>
                    </div>
                    <div className={"filter-more-common-type-con"}>
                        <div className={"filter-item-type-title"}>朝向</div>
                        <div className={"filter-item-type-tag-con"}>
                            { renderItemTag(props.oriented) }
                        </div>
                    </div>
                    <div className={"filter-more-common-type-con"}>
                        <div className={"filter-item-type-title"}>楼层</div>
                        <div className={"filter-item-type-tag-con"}>
                            { renderItemTag(props.floor) }
                        </div>
                    </div>
                    <div className={"filter-more-common-type-con"}>
                        <div className={"filter-item-type-title"}>房屋亮点</div>
                        <div className={"filter-item-type-tag-con"}>
                            { renderItemTag(props.characteristic) }
                        </div>
                    </div>
                </div>
                <PickerFooter onCancel={onCancel} onSave={props.onSave} value={moreSelected} type={props.type} cancelText={"清除"} />
            </div>
        </div>
    )
}

export default FilterMore
