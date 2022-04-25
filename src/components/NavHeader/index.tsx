import React from "react";
import { NavBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { NavType } from "../../untils/types";
import "./index.css";

const NavHeader = (props: NavType) => {

    const navigate = useNavigate();

    const handleOnBack = (path: number) => {
        navigate(path)
    }

    return (
        <div>
            {/* @ts-ignore */}
            <NavBar
                className={`city-list-nav-bar ${props.className} ${props.isMargin ? 'city-list-nav-margin' : ''}`}
                onBack={() => handleOnBack(-1)}
                right={props.right ? props.right : ''}
            >
                {props.title}
            </NavBar>
        </div>
    )
}

export default NavHeader;