import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import api from "../../server/api";
import HousePackage from "../../components/HousePackage";
import NavHeader from "../../components/NavHeader";
import SIcon from "../../components/SIcon";
import { Swiper } from "antd-mobile";
import "./HouseList.css";

const HouseDetail = () => {

    const params = useParams()
    const [ floor, setFloor ] = useState<string>('')
    const [ tags, setTags ] = useState<string[]>([])
    const [ houseOriented, setSouseOriented ] = useState<string[]>([])
    const [ price, setPrice ] = useState<number>(0)
    const [ size, setSize ] = useState<number>(0)
    const [ roomClass, setRoomClass ] = useState<number>(0)
    const [ title, setTitle ] = useState<string>('')
    const [ houseName, setHouseName ] = useState<string>()
    const [ houseImg, setHouseImg ] = useState<string[]>([])
    const [ packageList, setPackageList ] = useState<string[]>([])

    const getHouseInfo = () => {
        api.getHouseInfo(params.houseId as string).then((res) => {
            console.log(res)
            if (res.status === 200) {
                const { community, houseImg, supporting, title, tags, price, roomType, size, floor, oriented } = res.body
                setTags(tags)
                setSouseOriented(oriented)
                setFloor(floor)
                setRoomClass(roomType)
                setPrice(price)
                setSize(size)
                setTitle(title)
                setHouseImg(houseImg)
                setHouseName(community)
                setPackageList(supporting)
            }
        })
    }

    const houseNavRight = (
        <SIcon icon={"icon-share"} size={2}></SIcon>
    )
    
    useEffect(() => {
        getHouseInfo()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={"house-detail-con"}>
            <div className={"house-detail-header-room"}>
                <NavHeader title={houseName as string} className={"house-detail-nav-self"} right={houseNavRight} />
                {
                    houseImg.length > 0 ? <Swiper loop autoplay className={"house-detail-swiper-room"}>
                        {
                            houseImg.map((itemHouseImg) => (
                                // @ts-ignore
                                <Swiper.Item key={itemHouseImg} className={"house-detail-img-item-room"}>
                                    <img alt={"房屋图片"} src={`http://localhost:8080${itemHouseImg}`} />
                                </Swiper.Item>
                            ))
                        }
                    </Swiper> : <div></div>
                }
            </div>
            <div className={"house-detail-info-room"}>
                <div className={"house-detail-item-info-room"}>
                    <div className={"house-detail-item-info-children-room house-detail-item-info-children-border"}>
                        <div className={"house-detail-item-title house-detail-item-info-common-header"}>{ title }</div>
                        <div className={"house-detail-item-tag-room house-detail-item-info-common-header"}>
                            {
                                tags.map((itemTag) => (
                                    <div className={"house-detail-item-tag"} key={itemTag}>{ itemTag }</div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={"house-detail-item-info-room"}>
                    <div className={"house-detail-item-info-children-room house-detail-item-info-children-border house-detail-item-info-number"}>
                        <div className={"house-detail-item-info-number-room"}>
                            <div className={"house-detail-item-info-common-number"}>{ price }<span className={"house-detail-item-info-special"}>/月</span></div>
                            <div className={"house-detail-item-info-desc-number"}>租金</div>
                        </div>
                        <div className={"house-detail-item-info-number-room"}>
                            <div className={"house-detail-item-info-common-number"}>{ roomClass }</div>
                            <div className={"house-detail-item-info-desc-number"}>房型</div>
                        </div>
                        <div className={"house-detail-item-info-number-room"}>
                            <div className={"house-detail-item-info-common-number"}>{ size }平米</div>
                            <div className={"house-detail-item-info-desc-number"}>面积</div>
                        </div>
                    </div>
                </div>
                <div className={"house-detail-item-info-room"}>
                    <div className={"house-detail-item-info-children-room house-detail-item-info-number"}>
                        <div className={"house-detail-item-info-common"}>
                            <div className={"house-detail-item-info-word-room"}>
                                装修：<span className={"house-detail-item-info-special-word"}>精装</span>
                            </div>
                            <div className={"house-detail-item-info-word-room"}>
                                楼层：<span className={"house-detail-item-info-special-word"}>{ floor }</span>
                            </div>
                        </div>
                        <div className={"house-detail-item-info-common"}>
                            <div className={"house-detail-item-info-word-room"}>
                                朝向：{
                                    houseOriented.map((itemOriented) => (
                                        <span key={itemOriented} className={"house-detail-item-info-special-word"}>{ itemOriented }</span>
                                    ))
                                }
                            </div>
                            <div className={"house-detail-item-info-word-room"}>
                                类型：<span className={"house-detail-item-info-special-word"}>普通住宅</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"house-detail-split"}></div>
            <div className={"house-detail-map-con"}></div>
            {
                packageList.length > 0 ? <HousePackage list={packageList} /> : <div></div>
            }
        </div>
    )
}

export default HouseDetail