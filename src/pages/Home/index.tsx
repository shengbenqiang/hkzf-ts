import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { TabBar } from 'antd-mobile';
import SIcon from "../../components/SIcon";
import { tabBarType } from "../../untils/types";
import "./Home.css";

const Home = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const tabs: tabBarType[] = [
        {
            key: '/home',
            title: '首页',
            icon: <SIcon icon={"icon-ind"} />,
        },
        {
            key: '/home/houseList',
            title: '找房',
            icon: <SIcon icon={"icon-findHouse"} />,
        },
        {
            key: '/home/news',
            title: '资讯',
            icon: <SIcon icon={"icon-infom"} />,
        },
        {
            key: '/home/profile',
            title: '我的',
            icon: <SIcon icon={"icon-my"} />,
        },
    ]

    const handleTabChange = (key: string) => {
        setPage(key);
        navigate(key);
    }

    const [ page, setPage ] = useState<string>("/home")

    useEffect(() => {
        setPage(pathname);
    }, [ pathname ])

    return (
        <div className={"home-con"}>
            <div className={"home-router-view"}>
                <Outlet />
            </div>
            {/* 单标签形式不报错，但也随之无法书写 TabBar.Item，已知是类型问题，不知怎么解决*/}
            {/* @ts-ignore */}
            <TabBar
                className={"home-router-tab-bar"}
                onChange={(key) => handleTabChange(key)}
                defaultActiveKey={page}
            >
                {
                    tabs.map(item => (
                        <TabBar.Item
                            key={item.key}
                            icon={item.icon}
                            title={item.title}
                            className={ item.key === page ? 'home-router-select-tabBar' : 'home-router-un-select-tabBar' }
                        />
                    ))
                }
            </TabBar>
        </div>
    )
}

export default Home;
