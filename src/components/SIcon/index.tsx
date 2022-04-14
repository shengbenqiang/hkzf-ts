import React from "react";
import { iconProps } from "../../untils/types";
import "./index.css";
import "../../assets/fonts/iconfont.css";

const SIcon = (props: iconProps) => {
    return (
        <i className={`iconfont ${props.icon} s-icon-style`}></i>
    )
}

export default SIcon;