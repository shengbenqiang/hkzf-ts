import React, { useState, useEffect } from "react";
import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import FilterMore from "../FilterMore";
import { conditionType, titleStats, SelectPicker, basePicker, baseBool, strObj, FilterType } from "../../../untils/types";
import { PickerValue } from "antd-mobile/es/components/picker-view";
import api from "../../../server/api";
import "./Filter.css";

const Filter = (props: FilterType) => {

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
        document.body.className = 'body-fix'
        if (type === 'area') {
            setCols(3)
            setPickerData([condition[type], condition['subway']])
        } else {
            setCols(1)
            setPickerData(condition[type])
        }
        const newTitleStatus = {...titleSelectedStatus}
        Object.keys(selectPicker).forEach((item) => {
            if (item === type) {
                newTitleStatus[item] = true
            } else {
                const result: baseBool = getTitleSelected(item, getItemSelectedValue(item))
                Object.assign(newTitleStatus, result)
            }
        })
        setTitleSelectedStatus(newTitleStatus)
        setOpenType(type)
    }
    
    const onCancel = () => {
        document.body.className = ''
        const result = getTitleSelected(openType, getItemSelectedValue(openType))
        setTitleSelectedStatus({ ...titleSelectedStatus, ...result })
        setOpenType('')
    }

    const onSave = (val?: PickerValue[] | undefined, type?: string) => {
        document.body.className = ''
        const result = getTitleSelected(openType, val as string[])
        setTitleSelectedStatus({...titleSelectedStatus, ...result})
        setSelectPicker({
            ...selectPicker,
            [type as string]: val
        })
        setOpenType('')
        const filter: strObj = {}
        const newSelectValue: SelectPicker = {
            ...selectPicker,
            [type as string]: val
        }
        const areaKey: string = newSelectValue.area[0]
        let areaValue: string = 'null'
        if (newSelectValue.area.length === 2) {
            areaValue = newSelectValue.area[1]
        } else if (newSelectValue.area.length === 4) {
            areaValue = newSelectValue.area[2] !== 'null' ? newSelectValue.area[3] !== 'null' ? newSelectValue.area[3] : newSelectValue.area[2] : newSelectValue.area[1]
        }
        filter[areaKey] = areaValue
        filter['rentType'] = newSelectValue.rentType[0]
        filter['price'] = newSelectValue.price[0]
        filter['more'] = newSelectValue.more.join(',')
        props.onFilter(filter)
    }

    // 后续需要修改类型
    const getTitleSelected = (title: string, value: string[]): titleStats => {
        const obj: titleStats = {} as titleStats
        const selectedVal = value.toString()
        if (title === 'area' && (selectedVal !== 'area,null,,' && selectedVal !== 'area,null')) {
            obj[title] = true
        } else if (title === 'mode' && selectedVal !== 'null') {
            obj[title] = true
        } else if (title === 'price' && selectedVal !== 'null') {
            obj[title] = true
        } else if (title === 'more' && value.length > 0) {
            obj[title] = true
        } else {
            obj[title] = false
        }
        return obj
    }

    const getItemSelectedValue = (type: string): string[] => {
        let obj: string[] = []
        if (type === "area") {
            obj = selectPicker.area
        } else if (type === "rentType") {
            obj = selectPicker.rentType
        } else if (type === "price") {
            obj = selectPicker.price
        } else if (type === "more") {
            obj = selectPicker.more
        }
        return obj
    }

    const getAllCondition = () => {
        const cityInfo = JSON.parse(localStorage.getItem('hkzf_city') as string)
        api.getCondition(cityInfo.value).then((res) => {
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
                        defaultValue={selectPicker.more}
                        onSave={onSave}
                        onCancel={onCancel}
                        type={openType}
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
