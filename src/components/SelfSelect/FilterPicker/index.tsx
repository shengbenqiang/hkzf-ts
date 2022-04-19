import React from "react";
import { PickerView } from "antd-mobile";
import PickerFooter from "../PickerFooter";
import { filterPickerType } from "../../../untils/types";
import "./FileterPicker.css";

const FilterPicker = (props: filterPickerType) => {

    const basicColumns = [
        [
            { label: '周一', value: 'Mon' },
            { label: '周二', value: 'Tues' },
            { label: '周三', value: 'Wed' },
            { label: '周四', value: 'Thur' },
            { label: '周五', value: 'Fri' },
        ],
        [
            { label: '上午', value: 'am' },
            { label: '下午', value: 'pm' },
        ]
    ]

    return (
        <div className={"filter-picker-con"}>
            <PickerView columns={basicColumns} />
            <PickerFooter />
        </div>
    )
}

export default FilterPicker
