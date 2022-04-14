import React, { useEffect, useState } from "react";
import { Swiper } from "antd-mobile";
import api from "../../server/api";
import { swiperType, axiosRes } from "../../untils/types";
import IndexNavigate from "../../components/IndexNavigate";
import "./index.css";

const Index = () => {

    const [ swiper, setSwiper ] = useState<swiperType[]>([])

    const getSwiper = (): swiperType[] | void => {
        api.getSwiper().then((res: axiosRes) => {
            if (res.status === 200) {
                setSwiper(res.body)
            }
        })
    }

    useEffect(() => {
        getSwiper()
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
            </div>
            <div className={"index-navigate-con"}>
                <IndexNavigate />
            </div>
        </div>
    )

}

export default Index;
