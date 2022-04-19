import React from "react";
import { titleListType, FilterTitleType } from "../../../untils/types";
import SIcon from "../../SIcon";
import "./FilterTitle.css";

const FilterTitle = (props: FilterTitleType) => {

    const titleList: titleListType[] = [
        {
            title: '区域',
            type: 'area'
        },
        {
            title: '方式',
            type: 'mode'
        },
        {
            title: '租金',
            type: 'price'
        },
        {
            title: '筛选',
            type: 'more'
        }
    ]

    return (
        <div className={"filter-title-con"}>
            {
                titleList.map((itemTitle) => {
                    const isSelect = props.titleSelectedStatus[itemTitle.type]
                    return (
                        <div
                            className={`filter-item-title-con ${ isSelect ? 'filter-item-selected-status' : '' }`}
                            key={itemTitle.type}
                            onClick={() => props.titleClick(itemTitle.type)}
                        >
                            <span>{ itemTitle.title }</span>
                            <SIcon icon={"icon-arrow"} color={isSelect ? '#21b97a' : ''} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FilterTitle
