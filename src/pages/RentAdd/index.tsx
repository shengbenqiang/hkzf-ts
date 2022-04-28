import React, { useEffect, useState } from "react";
import NavHeader from "../../components/NavHeader";
import { useNavigate, useLocation } from "react-router-dom";
import { List, Input, Picker, ImageUploader, TextArea } from "antd-mobile";
import { areaInfoType, PackageType } from "../../untils/types";
import {PickerValue} from "antd-mobile/es/components/picker-view";
import {ImageUploadItem} from "antd-mobile/es/components/image-uploader";
import HousePackage from "../../components/HousePackage";
import "./RentAdd.css";

const RentAdd = () => {

    const roomTypeData = [
        [
            { label: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
            { label: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
            { label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
            { label: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
            { label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f' }
        ]
    ]

    const floorData = [
        [
            { label: '高楼层', value: 'FLOOR|1' },
            { label: '中楼层', value: 'FLOOR|2' },
            { label: '低楼层', value: 'FLOOR|3' }
        ]
    ]

    const orientedData = [
        [
            { label: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
            { label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
            { label: '南', value: 'ORIEN|61e99445-e95e-7f37' },
            { label: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
            { label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
            { label: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
            { label: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
            { label: '西北', value: 'ORIEN|80795f1a-e32f-feb9' }
        ]
    ]

    const locate = useLocation()
    const navigate = useNavigate()

    const [ areaInfo, setArea ] = useState<areaInfoType>({} as areaInfoType)
    const [ rentPrice, setRentPrice ] = useState<string>('')
    const [ houseArea, setHouseArea ] = useState<string>('')
    const [ houseTitle, setHouseTitle ] = useState<string>('')
    const [ pickerVisible, setPickerVisible ] = useState<boolean>(false)
    const [ floorVisible, setFloorVisible ] = useState<boolean>(false)
    const [ orientedVisible, setOrientedVisible ] = useState<boolean>(false)
    const [ selectRoomType, setSelectRoomType ] = useState<PickerValue[]>([])
    const [ selectFloorType, setSelectFloorType ] = useState<PickerValue[]>([])
    const [ selectOrientedType, setSelectOrientedType ] = useState<PickerValue[]>([])
    const [ houseImgList, setHouseImgList ] = useState([])
    const [ packList, setPackList ] = useState<PackageType[]>([])
    const [ houseDesc, setHouseDesc ] = useState<string>('')

    const handleSelectArea = () => {
        navigate('/rent/rentSearch')
    }

    const handleRoomType = () => {
        setPickerVisible(true)
    }

    const handleFloor = () => {
        setFloorVisible(true)
    }

    const handleOriented = () => {
        setOrientedVisible(true)
    }

    const handleHouseImg = (items: ImageUploadItem[]) => {
        console.log(items)
    }

    const uploadHouseImg = (files: File): Promise<ImageUploadItem> => {
        return new Promise<ImageUploadItem>((resolve) => {
            console.log(files)
        })
    }

    const handleItemPackageClick = (info: PackageType) => {
        if (packList.filter((item) => item.id === info.id).length) {
            setPackList(packList.filter((item) => item.id !== info.id))
        } else {
            setPackList([...packList, info])
        }
    }

    useEffect(() => {
        const newLocate: any = locate
        if (newLocate.state) {
            setArea(newLocate.state.from)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={"rent-add-con"}>
            <NavHeader title={"发布房源"} />
            <div className={"rent-add-from-room"}>
                <List
                    header={
                        <div className={'rent-list-header'}>房源信息</div>
                    }
                    style={{ '--border-bottom': 'none' }}
                >
                    <List.Item
                        className={"render-list-common-item"}
                        prefix={"租金"}
                        extra={"￥/月"}
                    >
                        <Input value={rentPrice} placeholder={"请输入租金/月"} style={{ '--font-size': '1.4rem' }} onChange={(val) => setRentPrice(val)} />
                    </List.Item>
                    <List.Item
                        onClick={handleSelectArea}
                        prefix={"小区名称"}
                        extra={areaInfo.id ? areaInfo.name : "请选择小区名称"}
                        arrow={true}
                        className={"render-list-common-item"}
                    ></List.Item>
                    <List.Item
                        className={"render-list-common-item"}
                        prefix={"建筑面积"}
                        extra={"㎡"}
                    >
                        <Input value={houseArea} placeholder={"请输入建筑面积"} style={{ '--font-size': '1.4rem' }} onChange={(val) => setHouseArea(val)} />
                    </List.Item>
                    <List.Item
                        className={"render-list-common-item"}
                        onClick={handleRoomType}
                        prefix={"户型"}
                        extra={selectRoomType.length !== 0 ? roomTypeData[0].filter((item) => item.value === selectRoomType[0])[0].label : "请选择"}
                        arrow={true}
                    >
                        <Picker
                            columns={roomTypeData}
                            visible={pickerVisible}
                            value={selectRoomType}
                            onClose={() => {
                                setPickerVisible(false)
                            }}
                            onConfirm={v => {
                                setSelectRoomType(v)
                            }}
                        />
                    </List.Item>
                    <List.Item
                        className={"render-list-common-item"}
                        onClick={handleOriented}
                        prefix={"朝向"}
                        extra={selectOrientedType.length !== 0 ? orientedData[0].filter((item) => item.value === selectOrientedType[0])[0].label : "请选择"}
                        arrow={true}
                    >
                        <Picker
                            columns={orientedData}
                            visible={orientedVisible}
                            value={selectOrientedType}
                            onClose={() => {
                                setOrientedVisible(false)
                            }}
                            onConfirm={v => {
                                setSelectOrientedType(v)
                            }}
                        />
                    </List.Item>
                    <List.Item
                        className={"render-list-common-item"}
                        onClick={handleFloor}
                        prefix={"所在楼层"}
                        extra={selectFloorType.length !== 0 ? floorData[0].filter((item) => item.value === selectFloorType[0])[0].label : "请选择"}
                        arrow={true}
                    >
                        <Picker
                            columns={floorData}
                            visible={floorVisible}
                            value={selectFloorType}
                            onClose={() => {
                                setFloorVisible(false)
                            }}
                            onConfirm={v => {
                                setSelectFloorType(v)
                            }}
                        />
                    </List.Item>
                </List>
                <List
                    className={"rent-list-common-margin"}
                    header={
                        <div className={'rent-list-header'}>房屋标题</div>
                    }
                    style={{ '--border-bottom': 'none' }}
                >
                    <List.Item>
                        <Input value={houseTitle} style={{ '--font-size': '1.4rem' }} placeholder={"请输入标题（例如：整租 小区名 2室 5000元）"} onChange={(val) => setHouseTitle(val)} />
                    </List.Item>
                </List>
                {/* 未处理数据 */}
                <List
                    className={"rent-list-common-margin"}
                    header={
                        <div className={'rent-list-header'}>房屋图像</div>
                    }
                    style={{ '--border-bottom': 'none' }}
                >
                    <List.Item>
                        <ImageUploader
                            value={houseImgList}
                            onChange={handleHouseImg}
                            upload={uploadHouseImg}
                            multiple={true}
                        />
                    </List.Item>
                </List>
                {/* 未处理数据 */}
                <List
                    className={"rent-list-common-margin"}
                    header={
                        <div className={'rent-list-header'}>房屋配置</div>
                    }
                    style={{ '--border-bottom': 'none' }}
                >
                    <List.Item>
                        <HousePackage list={[]} listItemClick={handleItemPackageClick} selectList={packList} />
                    </List.Item>
                </List>
                <List
                    className={"rent-list-common-margin"}
                    header={
                        <div className={'rent-list-header'}>房屋描述</div>
                    }
                    style={{ '--border-bottom': 'none' }}
                >
                    <List.Item>
                        <TextArea
                            placeholder='请输入房屋描述信息'
                            value={houseDesc}
                            rows={5}
                            style={{ '--font-size': '1.4rem' }}
                            onChange={val => {
                                setHouseDesc(val)
                            }}
                        />
                    </List.Item>
                </List>
            </div>
        </div>
    )
}

export default RentAdd;