import React, { useState, useEffect } from "react";
import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import FilterMore from "../FilterMore";
import { conditionType, titleStats, SelectPicker, basePicker } from "../../../untils/types";
import { PickerValue } from "antd-mobile/es/components/picker-view";
import api from "../../../server/api";
import "./Filter.css";

const Filter = () => {

    const [ titleSelectedStatus, setTitleSelectedStatus ] = useState<titleStats>({
        more: false,
        rentType: false,
        price: false,
        area: false,
    })

    const [ cols, setCols ] = useState<number>(3)
    const [ openType, setOpenType ] = useState<string>('')
    const [ condition, setCondition ] = useState<conditionType>({})
    // 后续需要修改此处的类型检查
    const [ pickerData, setPickerData ] = useState<any>([])
    const [ selectPicker, setSelectPicker ] = useState<SelectPicker>({
        area: ['area', 'null'],
        rentType: ['null'],
        price: ['null'],
        more: []
    })

    const handleTitleClick = (type: string) => {
        judgeTitle(type)
        if (type === 'area') {
            setCols(3)
            setPickerData([condition[type], condition['subway']])
        } else {
            setCols(1)
            setPickerData(condition[type])
        }
        setOpenType(type)
    }
    
    const onCancel = () => {
        const newTitleStatus = {...titleSelectedStatus}
        if (openType === 'area' && (selectPicker[openType].length === 2 && selectPicker[openType][0] === 'area')) {
            newTitleStatus[openType] = false
        } else if (openType === 'rentType' && selectPicker[openType][0] === 'null') {
            newTitleStatus[openType] = false
        } else if (openType === 'price' && selectPicker[openType][0] === 'null') {
            newTitleStatus[openType] = false
        } else if (openType === 'price') {
            console.log('执行了')
        }
        setTitleSelectedStatus(newTitleStatus)
        setOpenType('')
    }

    const onSave = (val?: PickerValue[] | undefined, type?: string) => {
        setSelectPicker({
            ...selectPicker,
            [type as string]: val
        })
        setOpenType('')
    }

    const judgeTitle = (type: string) => {
        const newTitleStatus = {...titleSelectedStatus}
        Object.keys(newTitleStatus).forEach((itemStatus) => {
                if (itemStatus === type) {
                    newTitleStatus[itemStatus] = true
                    return
                }
                if (itemStatus === 'area' && (selectPicker[itemStatus].length !== 2 || selectPicker[itemStatus][0] !== 'area')) {
                    newTitleStatus[itemStatus] = true
                } else if (itemStatus === 'rentType' && selectPicker[itemStatus][0] !== 'null') {
                    newTitleStatus[itemStatus] = true
                } else if (itemStatus === 'price' && selectPicker[itemStatus][0] !== 'null') {
                    newTitleStatus[itemStatus] = true
                } else if (itemStatus === 'price') {
                    console.log('执行了')
                }
            }
        )
        setTitleSelectedStatus(newTitleStatus)
    }

    const getAllCondition = () => {
        const cityInfo = JSON.parse(localStorage.getItem('hkzf_city') as string)
        api.getCondition(cityInfo.value).then((res) => {
            console.log(res)
            if (res.status === 200) {
                setCondition(res.body)
            }
        })
    }

    useEffect(() => {
        getAllCondition()
    }, [])
    
    return (
        <div className={"filter-con"}>
            <div className={"filter-component-con"}>
                <FilterTitle titleSelectedStatus={titleSelectedStatus} titleClick={handleTitleClick} />
                {
                    openType === 'area' || openType === 'rentType' || openType === 'price' ?
                    <FilterPicker
                        key={openType}
                        onCancel={onCancel}
                        onSave={onSave}
                        data={pickerData}
                        cols={cols}
                        type={openType}
                        defaultValue={selectPicker[openType]}
                    /> :
                    openType === 'more' ?
                    <FilterMore
                        characteristic={condition.characteristic as basePicker[]}
                        oriented={condition.oriented as basePicker[]}
                        floor={condition.floor as basePicker[]}
                        roomType={condition.roomType as basePicker[]}
                        onSave={onSave}
                        onCancel={onCancel}
                    /> :
                    null
                }
            </div>
            {
                openType === 'area' || openType === 'rentType' || openType === 'price' ?
                <div
                    onClick={onCancel}
                    className={"filter-con-mask"}
                ></div> :
                null
            }
        </div>
    )
}

export default Filter
