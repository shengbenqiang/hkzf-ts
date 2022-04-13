import React from "react";
import { Outlet } from "react-router-dom";
import { TabBar } from 'antd-mobile';
import {
    AppOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons';
import { tabBarType } from "../../untils/types";

const Home = () => {

    const tabs: tabBarType[] = [
        {
            key: 'home',
            title: '首页',
            icon: <AppOutline />,
        },
        {
            key: 'todo',
            title: '我的待办',
            icon: <UnorderedListOutline />,
        },
        {
            key: 'message',
            title: '我的消息',
            icon: <MessageFill />,
        },
        {
            key: 'personalCenter',
            title: '个人中心',
            icon: <UserOutline />,
        },
    ]

    return (
        <div>
            首页
            <Outlet />
            {/* 单标签形式不报错，但也随之无法书写 TabBar.Item，已知是类型问题，不知怎么解决*/}
            {/* @ts-ignore */}
            <TabBar>
                {
                    tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))
                }
            </TabBar>
        </div>
    )
}

export default Home;
