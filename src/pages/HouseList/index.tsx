import React from "react";
import SIcon from "../../components/SIcon";
import SearchHeader from "../../components/SearchHeader";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/SelfSelect/Filter";
import "./HomeList.css";

const HouseList = () => {

    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <div className={"home-list-con"}>
            <div className={"home-list-header-con"}>
                <SIcon icon={"icon-back"} color={'#999'} size={1.7} callBack={handleBack} />
                <SearchHeader position={false} addressColor={'#00ae66'} addressSize={2.5} />
            </div>
            <Filter />
        </div>
    )
}

export default HouseList;