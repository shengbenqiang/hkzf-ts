import React from "react";
import { roomType } from "../../untils/types";
import { useNavigate } from "react-router-dom";
import "./HouseItem.css";

const HouseItem = (props: roomType) => {

    const navigate = useNavigate()

    const handleHouseClick = () => {
        navigate(`/houseDetail/${props.houseCode}`)
    }

    return (
        <div className={"map-house-list-item-con"} key={props.houseCode} onClick={handleHouseClick}>
            <div className={"map-house-list-item-room"}>
                <div className={"map-house-list-item-img"}>
                    <img src={`http://localhost:8080${props.houseImg}`} alt={props.desc}/>
                </div>
                <div className={"map-house-list-info-con"}>
                    <div className={"map-house-list-info-special-item map-house-list-info-title"}>{ props.title }</div>
                    <div className={"map-house-list-info-common-item map-house-list-info-desc"}> { props.desc } </div>
                    <div className={"map-house-list-info-common-item map-house-list-info-tag"}>
                        {
                            props.tags.map((itemTag) => (
                                <div className={"map-house-list-info-item-tag-con"} key={itemTag}>
                                    { itemTag }
                                </div>
                            ))
                        }
                    </div>
                    <div className={"map-house-list-info-special-item map-house-list-info-price"}> <span>{props.price}</span> 元/月 </div>
                </div>
            </div>
        </div>
    )
}

export default HouseItem