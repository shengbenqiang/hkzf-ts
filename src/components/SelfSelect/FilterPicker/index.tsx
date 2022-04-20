import React, { useState } from "react";
import { CascadePickerView, PickerView } from "antd-mobile";
import PickerFooter from "../PickerFooter";
import { filterPickerType } from "../../../untils/types";
import "./FileterPicker.css";
import { PickerValue } from "antd-mobile/es/components/picker-view";

const FilterPicker = (props: filterPickerType) => {

    const [ pickerValue, setPickerValue ] = useState<PickerValue[] | undefined>(undefined)

    return (
        <div className={"filter-picker-con"}>
            {
                props.cols === 3 ?
                <CascadePickerView
                    value={pickerValue}
                    defaultValue={props.defaultValue}
                    options={props.data}
                    style={{'--height': '30rem'}}
                    onChange={(val) => {
                        setPickerValue(val)
                    }}
                /> :
                <PickerView
                    value={pickerValue}
                    defaultValue={props.defaultValue}
                    columns={[props.data]}
                    style={{'--height': '30rem'}}
                    onChange={(val) => {
                        setPickerValue(val)
                    }}
                />
            }
            <PickerFooter onCancel={props.onCancel} onSave={props.onSave} value={pickerValue} type={props.type} />
        </div>
    )
}

export default FilterPicker
