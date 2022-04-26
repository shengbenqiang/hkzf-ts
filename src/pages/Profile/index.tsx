import React, {useEffect, useState} from "react";
import { Button, Grid, Modal } from "antd-mobile";
import api from "../../server/api";
import SIcon from "../../components/SIcon";
import { isAuth, removeToken } from "../../untils/auth";
import { userMenuType } from "../../untils/types";
import { useNavigate } from "react-router-dom";
import "./Profile.css";


const Profile = () => {

    const navigate = useNavigate()
    const defaultUserAvatar: string = 'http://localhost:8080/img/profile/avatar.png'
    const menus: userMenuType[] = [
        { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
        { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
        { id: 3, name: '看房记录', iconfont: 'icon-record' },
        { id: 4, name: '成为房主', iconfont: 'icon-identity' },
        { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
        { id: 6, name: '联系我们', iconfont: 'icon-cust' }
    ]

    const [ isLogin, setIsLogin ] = useState<boolean>(isAuth)
    const [ avatar, setAvatar ] = useState<string>('')
    const [ userName, setUserName ] = useState<string>('')

    const handleGridItemClick = (url: string) => {
        console.log(url)
    }

    const getUserInfo = () => {
        if (isLogin) {
            api.getUser().then((res) => {
                if (res.status === 200) {
                    const { avatar, nickname } = res.body
                    setAvatar(avatar)
                    setUserName(nickname)
                }
            })
        }
    }

    const handleLogin = () => {
        navigate('/login')
    }

    const handleLogout = async () => {
        const result = await Modal.confirm({
            content: '确认退出',
        })
        if (result) {
            removeToken()
            setIsLogin(false)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={"profile-con"}>
            <div className={"profile-header-room"}>
                <img alt={"背景图片"} src={`http://localhost:8080/img/profile/bg.png`}/>
                <div className={"profile-use-room"}>
                    <div className={"profile-header-user-avatar-room"}>
                        <img alt={"用户头像"} src={isLogin ? `http://localhost:8080${avatar}` : defaultUserAvatar}/>
                    </div>
                    {
                        isLogin ?
                        <div className={"profile-header-user-login-name-room"}>
                            <div>{userName}</div>
                            <div>
                                <Button size={"mini"} color={"success"} onClick={handleLogout}>退出</Button>
                            </div>
                        </div> :
                        <div className={"profile-header-user-name"}>
                            游客
                        </div>
                    }
                    <div className={"profile-header-user-operate"}>
                        {
                            isLogin ?
                            <div className={"profile-header-user-is-login-operate"}>
                                编辑个人资料~
                                <span className={"profile-header-user-is-login-operate-arrow"}>
                                    <SIcon icon={"icon-arrow"} />
                                </span>
                            </div> :
                            <Button onClick={handleLogin} size={"mini"} color={"success"}>登录</Button>
                        }
                    </div>
                </div>
            </div>
            <div className={"profile-header-operate-room"}>
                {/* @ts-ignore */}
                <Grid columns={3} gap={8}>
                    {
                        menus.map((itemMenu) => (
                            // @ts-ignore
                            <Grid.Item key={itemMenu.id} onClick={itemMenu.to ? () => handleGridItemClick(itemMenu.to) : () => {}}>
                                <div className={"profile-operate-item-room"}>
                                    <SIcon icon={itemMenu.iconfont} size={2.6} />
                                    <div className={"profile-operate-item-name"}>{ itemMenu.name }</div>
                                </div>
                            </Grid.Item>
                        ))
                    }
                </Grid>
            </div>
            <div className={"profile-add-us-room"}>
                <img alt={"加入我们0"} src={`http://localhost:8080/img/profile/join.png`}/>
            </div>
        </div>
    )
}

export default Profile;
