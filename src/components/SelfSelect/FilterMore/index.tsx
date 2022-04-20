import React, { ReactNode } from "react";
import { FilterMoreType, basePicker } from "../../../untils/types"
import PickerFooter from "../PickerFooter";
import "./FilterMore.css";

const FilterMore = (props: FilterMoreType) => {

    const renderItemTag = (renderData: basePicker[]): ReactNode => {
        return (
            renderData.map((itemTag) => (
                <div className={"filter-item-type-item-tag-con"} key={itemTag.value}>
                    { itemTag.label }
                </div>
            ))
        )
    }

    return (
        <div className={"filter-more-con"}>
            <div className={"filter-more-mask"}></div>
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
                <PickerFooter onCancel={props.onCancel} onSave={props.onSave} />
            </div>
        </div>
    )
}

export default FilterMore
