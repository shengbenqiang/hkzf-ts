import React from "react";
import { indexNavigate } from "../../untils/types";
import { useNavigate } from "react-router-dom";
import NavOne from "../../assets/images/nav-1.png";
import NavTwo from "../../assets/images/nav-2.png";
import NavThree from "../../assets/images/nav-3.png";
import NavFour from "../../assets/images/nav-4.png";
import "./index.css";

const IndexNavigate = () => {

    const navigateRouter = useNavigate()

    const navigate: indexNavigate[] = [
        {
            img: NavOne,
            name: "整租",
            path: '/home/houseList'
        },
        {
            img: NavTwo,
            name: "合租",
            path: '/home/houseList'
        },
        {
            img: NavThree,
            name: "地图找房",
            path: '/map'
        },
        {
            img: NavFour,
            name: "去出租",
            path: '/rent'
        }
    ]

    const handleNavigateClick = (path: string) => {
        navigateRouter(path);
    }

    return (
        <div className={"index-navigate-component-con"}>
            {
                navigate.map((item) => (
                    <div key={item.img} className={"index-navigate-component-item-con"} onClick={() => handleNavigateClick(item.path)}>
                        <img alt={item.name} src={item.img} className={"index-navigate-component-item-img"} />
                        <div className={"index-navigate-component-item-name"}>{ item.name }</div>
                    </div>
                ))
            }
        </div>
    )
}

export default IndexNavigate;