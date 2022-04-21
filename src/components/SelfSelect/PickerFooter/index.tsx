import React from "react";
import { PickerFooterType } from "../../../untils/types";
import "./PickerFooter.css";

const PickerFooter = (props: PickerFooterType) => {
    return (
        <div className={"picker-footer-con"}>
            <div className={"picker-footer-left-btn"} onClick={props.onCancel}>{ props.cancelText }</div>
            <div className={"picker-footer-right-btn"} onClick={() => props.onSave(props.value, props.type)}>确定</div>
        </div>
    )
}

export default PickerFooter;