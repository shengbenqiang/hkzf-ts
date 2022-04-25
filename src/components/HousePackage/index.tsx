import React, {useEffect, useState} from "react";
import { PackageType, HousePackageType } from "../../untils/types";
import SIcon from "../SIcon";
import "./HousePackage.css";

const HousePackage = (props: HousePackageType) => {

    const [ listData, setListData ] = useState<PackageType[]>([])

    const package_data: PackageType[] = [
        {
            id: 1,
            name: '衣柜',
            icon: 'icon-wardrobe'
        },
        {
            id: 2,
            name: '洗衣机',
            icon: 'icon-wash'
        },
        {
            id: 3,
            name: '空调',
            icon: 'icon-air'
        },
        {
            id: 4,
            name: '天然气',
            icon: 'icon-gas'
        },
        {
            id: 5,
            name: '冰箱',
            icon: 'icon-ref'
        },
        {
            id: 6,
            name: '暖气',
            icon: 'icon-Heat'
        },
        {
            id: 7,
            name: '电视',
            icon: 'icon-vid'
        },
        {
            id: 8,
            name: '热水器',
            icon: 'icon-heater'
        },
        {
            id: 9,
            name: '宽带',
            icon: 'icon-broadband'
        },
        {
            id: 10,
            name: '沙发',
            icon: 'icon-sofa'
        }
    ]

    const filterPackage = () => {
        const listType = package_data.filter((itemPackage) => props.list.includes(itemPackage.name))
        setListData(listType)
    }

    useEffect(() => {
        filterPackage()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={"house-package-con"}>
            {
                listData.map((itemPackage) => (
                    <div className={"house-item-package-item"} key={itemPackage.id}>
                        <SIcon icon={itemPackage.icon} size={2.8} />
                        <div className={"house-item-package-word"}>{ itemPackage.name }</div>
                    </div>
                ))
            }
        </div>
    )
}

export default HousePackage
