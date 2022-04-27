import React, {useEffect, useState} from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../../server/api";
import HousePackage from "../../components/HousePackage";
import NavHeader from "../../components/NavHeader";
import SIcon from "../../components/SIcon";
import HouseItem from "../../components/HouseItem";
import {Swiper, Modal, Toast} from "antd-mobile";
import { locate, roomType } from "../../untils/types";
import { isAuth } from "../../untils/auth";
import "./HouseDetail.css";

const HouseDetail = () => {

    const recommendHouses: roomType[] = [
        {
            houseCode: '1',
            houseImg: '/img/news/1.png',
            desc: '72.32㎡/南 北/低楼层',
            title: '安贞西里 3室1厅',
            price: 4500,
            tags: ['随时看房']
        },
        {
            houseCode: '2',
            houseImg: '/img/news/2.png',
            desc: '83㎡/南/高楼层',
            title: '天居园 2室1厅',
            price: 7200,
            tags: ['近地铁']
        },
        {
            houseCode: '3',
            houseImg: '/img/news/3.png',
            desc: '52㎡/西南/低楼层',
            title: '角门甲4号院 1室1厅',
            price: 4300,
            tags: ['集中供暖']
        }
    ]

    const params = useParams()
    const navigate = useNavigate()
    const locate = useLocation()
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
    const [ desc, setDesc ] = useState<string>('')
    const [ favorites, setFavorites ] = useState<boolean>(false)

    const getHouseInfo = () => {
        api.getHouseInfo(params.houseId as string).then((res) => {
            if (res.status === 200) {
                const { community, houseImg, supporting, title, tags, price, roomType, size, floor, oriented, coord, description } = res.body
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
                createHouseMap(coord, community)
                setDesc(description)
            }
        })
    }

    const houseNavRight = (
        <SIcon icon={"icon-share"} size={2}></SIcon>
    )
    
    const createHouseMap = (locate: locate, communityName: string) => {
        const map = new BMapGL.Map("houseMapContainer")
        const point = new BMapGL.Point(Number(locate.longitude), Number(locate.latitude))
        map.centerAndZoom(point, 17)
        const label = new BMapGL.Label(
            `
                <span>${communityName}</span>
                <div class="house-map-arrow"></div>
            `,
            {
                position: point,
                offset: new BMapGL.Size(0, -36)
            }
        )
        label.setStyle({
            position: 'absolute',
            zIndex: -7982820,
            backgroundColor: 'rgb(238, 93, 91)',
            color: 'rgb(255, 255, 255)',
            height: 25,
            padding: '5px 10px',
            lineHeight: '14px',
            borderRadius: 3,
            boxShadow: 'rgb(204, 204, 204) 2px 2px 2px',
            whiteSpace: 'nowrap',
            fontSize: 12,
            userSelect: 'none'
        })
        map.addOverlay(label)
    }

    const checkFavorites = () => {
        api.getFavoritesInfo(params.houseId as string).then((res) => {
            if (res.status === 200) {
                setFavorites(res.body.isFavorite)
            }
        })
    }

    const handleCollect = async () => {
        const isLogin = isAuth()
        if (!isLogin) {
            const result = await Modal.confirm({
                content: '登录后才能收藏房源，是否去登录？',
            })
            if (result) {
                navigate('/login', { state: { from: locate } })
            }
            return
        }
        if (favorites) {
            api.cancelFavorites(params.houseId as string).then((res) => {
                if (res.status === 200) {
                    Toast.show('已取消收藏')
                    setFavorites(false)
                } else {
                    Toast.show('登录超时，请重新登录')
                    setFavorites(false)
                }
            })
        } else {
            api.addFavorites(params.houseId as string).then((res) => {
                if (res.status === 200) {
                    Toast.show('收藏成功')
                    setFavorites(true)
                } else {
                    Toast.show('登录超时，请重新登录')
                    setFavorites(false)
                }
            })
        }
    }
    
    useEffect(() => {
        getHouseInfo()
        checkFavorites()
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
            <div className={"house-detail-map-con"}>
                <div className={"house-detail-common-title"}>小区：<span className={"house-detail-item-info-special-word"}>{ houseName }</span></div>
                <div id={"houseMapContainer"} className={"house-detail-common-map-room"}></div>
            </div>
            <div className={"house-detail-map-con"}>
                <div className={"house-detail-common-title house-detail-item-info-special-word house-detail-item-info-children-border"}>房屋配套：</div>
                {
                    packageList.length > 0 ? <HousePackage list={packageList} /> : <div className={"house-detail-empty-package"}>暂无数据</div>
                }
            </div>
            <div className={"house-detail-split"}></div>
            <div className={"house-detail-origin-survey-con"}>
                <div className={"house-detail-common-title house-detail-item-info-special-word house-detail-item-info-children-border"}>房源概况：</div>
                <div className={"house-detail-origin-own-header"}>
                    <div className={"header-detail-origin-own-info"}>
                        <img alt={"房主头像"} src={`http://localhost:8080/img/avatar.png`} className={"header-detail-origin-own-avatar"}/>
                        <div className={"header-detail-origin-own-name"}>
                            <div>王女士</div>
                            <div className="userAuth">
                                <SIcon icon={"icon-auth"} />
                                已认证房主
                            </div>
                        </div>
                    </div>
                    <div className={"header-detail-origin-send-message"}>发消息</div>
                </div>
                <div className={"header-detail-origin-desc"}>{ desc || '暂无房屋描述' }</div>
            </div>
            <div className={"house-detail-origin-survey-con"}>
                <div className={"house-detail-common-title house-detail-item-info-special-word house-detail-item-info-children-border house-detail-common-margin"}>猜你喜欢：</div>
                {
                    recommendHouses.map((itemHouse) => (
                        <HouseItem
                            key={itemHouse.houseCode}
                            houseCode={itemHouse.houseCode}
                            desc={itemHouse.desc}
                            houseImg={itemHouse.houseImg}
                            price={itemHouse.price}
                            tags={itemHouse.tags}
                            title={itemHouse.title}
                        />
                    ))
                }
            </div>
            <div className={"house-detail-operate-room"}>
                <div className={"house-detail-item-btn-operate-room"} onClick={handleCollect}>
                    <img className={"house-detail-item-collect-start"} alt={"已收藏"} src={`http://localhost:8080/${favorites ? 'img/star.png' : 'img/unstar.png'}`} />
                    { favorites ? '已收藏' : '收藏' }
                </div>
                <div className={"house-detail-item-btn-operate-room"}>在线咨询</div>
                <div className={"house-detail-item-btn-operate-room"}>电话预约</div>
            </div>
        </div>
    )
}

export default HouseDetail