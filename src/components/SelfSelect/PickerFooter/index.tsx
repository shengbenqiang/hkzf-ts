import React from "react";
import "./PickerFooter.css";

const PickerFooter = () => {
    return (
        <div className={"picker-footer-con"}>
            <div className={"picker-footer-left-btn"}>取消</div>
            <div className={"picker-footer-right-btn"}>确定</div>
        </div>
    )
}

export default PickerFooter;