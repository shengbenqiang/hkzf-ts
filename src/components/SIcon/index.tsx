import React from "react";
import { iconProps } from "../../untils/types";
import "./index.css";
import "../../assets/fonts/iconfont.css";

const SIcon = (props: iconProps) => {

    return (
        <i onClick={ props.callBack ? props.callBack : undefined } className={`iconfont ${props.icon} s-icon-style`} style={{ fontSize: props.size + 'rem', color: props.color ? props.color : ''}}></i>
    )
}

export default SIcon;