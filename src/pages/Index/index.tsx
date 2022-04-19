import React, { useEffect, useState } from "react";
import { Swiper, Grid } from "antd-mobile";
import api from "../../server/api";
import { swiperType, axiosRes, groupType, newType } from "../../untils/types";
import SearchHeader from "../../components/SearchHeader";
import IndexNavigate from "../../components/IndexNavigate";
import "./index.css";

const Index = () => {

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

    useEffect(() => {
        getNews()
        getSwiper()
        // getLocate()
        getRentGroups()
    }, [])

    return (
        <div className={"index-con"}>
            <div className={"index-swiper-con"}>
                {
                    swiper.length > 0 ? <Swiper loop autoplay>
                        {
                            swiper.map((itemSwiper) => (
                                // @ts-ignore
                                <Swiper.Item key={itemSwiper.id} className={"index-swiper-item"}>
                                    <img className={"index-swiper-item-img"} src={`http://localhost:8080${itemSwiper.imgSrc}`} alt={itemSwiper.alt}/>
                                </Swiper.Item>
                            ))
                        }
                    </Swiper> : <div></div>
                }
                <SearchHeader position={true} addressSize={3} />
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
