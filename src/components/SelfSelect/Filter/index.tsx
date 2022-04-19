import React, { useState } from "react";
import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
// import FilterMore from "../FilterMore";
import { titleStats } from "../../../untils/types";
import "./Filter.css";

const Filter = () => {

    const [ titleSelectedStatus, setTitleSelectedStatus ] = useState<titleStats>({
        more: false,
        mode: false,
        price: false,
        area: false,
    })

    const [ openType, setOpenType ] = useState<string>('')

    const handleTitleClick = (type: string) => {
        setOpenType(type)
        setTitleSelectedStatus({
            ...titleSelectedStatus,
            [type]: !titleSelectedStatus[type]
        })
    }
    
    const onCancel = () => {
        setOpenType('')
    }

    const HandleMaskClick = () => {
        setOpenType('')
    }
    
    return (
        <div className={"filter-con"}>
            <div className={"filter-component-con"}>
                <FilterTitle titleSelectedStatus={titleSelectedStatus} titleClick={handleTitleClick} />
                {
                    openType === 'area' || openType === 'mode' || openType === 'price' ?
                    <FilterPicker onCancel={() => onCancel()}/> :
                    null
                }
            </div>
            {
                openType === 'area' || openType === 'mode' || openType === 'price' ?
                <div
                    onClick={HandleMaskClick}
                    className={"filter-con-mask"}
                ></div> :
                null
            }
        </div>
    )
}

export default Filter
