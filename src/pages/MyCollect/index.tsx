import React, {useEffect, useState} from "react";
import NavHeader from "../../components/NavHeader";
import api from "../../server/api";
import { roomType } from "../../untils/types";
import HouseItem from "../../components/HouseItem";
import "./MyCollect.css";

const MyCollect = () => {

    const [ collectList, setCollectList ] = useState<roomType[]>([])

    const getCollectList = () => {
        api.getFavoritesList().then((res) => {
            if (res.status === 200) {
                setCollectList(res.body)
            }
        })
    }

    useEffect(() => {
        getCollectList()
    }, [])

    return (
        <div className={"my-collect-con"}>
            <NavHeader title={"收藏列表"} />
            <div className={"my-collect-list-room"}>
                {
                    collectList.map((itemHouse) => (
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
        </div>
    )
}

export default MyCollect;