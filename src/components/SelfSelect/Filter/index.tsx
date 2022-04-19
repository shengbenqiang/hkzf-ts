import React, { useState } from "react";
import FilterTitle from "../FilterTitle";
// import FilterPicker from "../FilterPicker";
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

    const handleTitleClick = (type: string) => {
        setTitleSelectedStatus({
            ...titleSelectedStatus,
            [type]: !titleSelectedStatus[type]
        })
    }
    
    return (
        <div className={"filter-con"}>
            <div className={"filter-component-con"}>
                <FilterTitle titleSelectedStatus={titleSelectedStatus} titleClick={handleTitleClick} />
            </div>
        </div>
    )
}

export default Filter
