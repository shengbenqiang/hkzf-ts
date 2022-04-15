import React, { useEffect, useState } from "react";
import { Swiper, Grid } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import api from "../../server/api";
import { swiperType, axiosRes, groupType, newType } from "../../untils/types";
import SIcon from "../../components/SIcon";
import IndexNavigate from "../../components/IndexNavigate";
import "./index.css";

const Index = () => {

    const navigate = useNavigate()
    const [ news, setNews ] = useState<newType[]>([])
    const [ groups, setGroups ] = useState<groupType[]>([])
    const [ swiper, setSwiper ] = useState<swiperType[]>([])

    const getSwiper = (): swiperType[] | void => {
        api.getSwiper().then((res: axiosRes) => {
            if (res.status === 200) {
                setSwiper(res.body)
            }
        })
    }

    const getRentGroups = () => {
        api.getRentGroup().then((res: axiosRes) => {
            if (res.status === 200) {
                setGroups(res.body)
            }
        })
    }

    const getNews = () => {
        api.getNews().then((res: axiosRes) => {
            if (res.status === 200) {
                setNews(res.body)
            }
        })
    }

    const getLocate = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
        }, (error) => {
            console.log(error)
        })
    }

    const handleNavigate = (path: string): void => {
        navigate(path)
    }

    useEffect(() => {
        getNews()
        getSwiper()
        getLocate()
        getRentGroups()
    }, [])

    return (
        <div className={"index-con"}>
            <div className={"index-swiper-con"}>
                <Swiper loop autoplay>
                    {
                        swiper.map((itemSwiper) => (
                            // @ts-ignore
                            <Swiper.Item key={itemSwiper.id} className={"index-swiper-item"}>
                                <img className={"index-swiper-item-img"} src={`http://localhost:8080${itemSwiper.imgSrc}`} alt={itemSwiper.alt}/>
                            </Swiper.Item>
                        ))
                    }
                </Swiper>
                <div className={"index-header-navigate-con"}>
                    <div className={"index-header-search-con"}>
                        <div className={"index-header-now-locate-con"} onClick={() => handleNavigate('/cityList')}>
                            <div className={"index-header-now-locate-child"}>
                                <span>上海</span>
                                <SIcon icon={"icon-arrow"} />
                            </div>
                        </div>
                        <div className={"index-header-search-entry"} onClick={() => handleNavigate('/search')}>
                            <SIcon icon={"icon-seach"} />
                            <span className={"index-header-search-entry-input"}>请输入小区或地址</span>
                        </div>
                    </div>
                    <div className={"index-header-locate-con"} onClick={() => handleNavigate('/map')}>
                        <SIcon icon={"icon-map"} size={3}/>
                    </div>
                </div>
            </div>
            <div className={"index-navigate-con"}>
                <IndexNavigate />
            </div>
            <div className={"index-rent-groups-con"}>
                <div className={"index-rent-groups-title-con"}>
                    <h2>租房小组</h2>
                    <div>更多</div>
                </div>
                {/* @ts-ignore */}
                <Grid columns={2} gap={8} className={"index-rent-groups-content-con"}>
                    {
                        groups.map((itemGroup) => (
                            // @ts-ignore
                            <Grid.Item key={itemGroup.id}>
                                <div className={"index-rent-item-group-con"}>
                                    <div className={"index-rent-item-group-title-con"}>
                                        <h2>{ itemGroup.title }</h2>
                                        <div>{ itemGroup.desc }</div>
                                    </div>
                                    <div className={"index-rent-item-group-img-con"}>
                                        <img src={`http://localhost:8080${itemGroup.imgSrc}`} alt={itemGroup.desc}/>
                                    </div>
                                </div>
                            </Grid.Item>
                        ))
                    }
                </Grid>
            </div>
            <div className={"index-message-con"}>
                <div className={"index-message-title-con"}>
                    <h2>最新资讯</h2>
                </div>
                {
                    news.map((itemNew) => (
                        <div className={"index-message-item-parent-con"} key={itemNew.id}>
                            <div className={"index-message-item-con"}>
                                <div className={"index-message-item-img-con"}>
                                    <img src={`http://localhost:8080${itemNew.imgSrc}`} alt={itemNew.title}/>
                                </div>
                                <div className={"index-message-item-info-con"}>
                                    <div className={"index-message-info-title"}>
                                        {itemNew.title}
                                    </div>
                                    <div className={"index-message-info-desc"}>
                                        <div>{itemNew.from}</div>
                                        <div>{itemNew.date}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}

export default Index;
