import React, { useEffect, useState } from "react";
import NavHeader from "../../components/NavHeader";
import { roomType } from "../../untils/types";
import api from "../../server/api";
import HouseItem from "../../components/HouseItem";
import NoHouse from "../../components/NoHouse";
import "./Rent.css";

const Rent = () => {

    const [ release, setRelease ] = useState<roomType[]>([])

    const getReleaseRent = () => {
        api.getReleaseRent().then((res) => {
            if (res.status === 200) {
                setRelease(res.body)
            }
        })
    }

    useEffect(() => {
        getReleaseRent()
    }, [])

    return (
        <div className={"rent-con"}>
            <NavHeader title={"房源列表"} />
            <div className={"rent-room"}>
                {
                    release.length > 0 ?
                        release.map((itemHouse) => (
                            <HouseItem
                                key={itemHouse.houseCode}
                                houseCode={itemHouse.houseCode}
                                desc={itemHouse.desc}
                                houseImg={itemHouse.houseImg}
                                price={itemHouse.price}
                                tags={itemHouse.tags}
                                title={itemHouse.title}
                            />
                        )) :
                        <NoHouse emptyWord={"您还没有发布过房源"} linkWord={"快去发布房源~"} linkPath={"/rent/rentAdd"} />
                }
            </div>
        </div>
    )
}

export default Rent;