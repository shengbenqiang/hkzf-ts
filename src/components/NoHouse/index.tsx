import React from "react";
import { EmptyType } from "../../untils/types";
import emptyImg from "../../assets/images/not-found.png";
import "./NoHouse.css";

const NoHouse = (props: EmptyType) => {
    return (
        <div className={"no-house-con"}>
            <img alt={"空状态组件"} src={emptyImg} />
            <p className={"no-house-word"}>{ props.emptyWord }</p>
        </div>
    )
}

export default NoHouse;