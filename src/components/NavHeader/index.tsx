import React from "react";
import { NavBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { NavType } from "../../untils/types";
import "./index.css";

const NavHeader = (props: NavType) => {

    const navigate = useNavigate();

    const handleOnBack = (path: string) => {
        navigate(path)
    }

    return (
        <div>
            {/* @ts-ignore */}
            <NavBar className={`city-list-nav-bar ${props.isMargin ? 'city-list-nav-margin' : ''}`} onBack={() => handleOnBack(props.path)}>{props.title}</NavBar>
        </div>
    )
}

export default NavHeader;