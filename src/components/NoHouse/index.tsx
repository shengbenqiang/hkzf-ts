import React from "react";
import { EmptyType } from "../../untils/types";
import emptyImg from "../../assets/images/not-found.png";
import { useNavigate } from "react-router-dom";
import "./NoHouse.css";

const NoHouse = (props: EmptyType) => {

    const navigate = useNavigate()

    const handleLinkClick = () => {
        navigate(props.linkPath as string)
    }

    return (
        <div className={"no-house-con"}>
            <img alt={"空状态组件"} src={emptyImg} />
            <p className={"no-house-word"}>
                { props.emptyWord }
                {
                    props.linkWord ? <span onClick={handleLinkClick} className={"no-house-ling-word"}>{ props.linkWord }</span> : ''
                }
            </p>
        </div>
    )
}

export default NoHouse;