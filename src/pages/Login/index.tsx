import React, {useState} from "react";
import NavHeader from "../../components/NavHeader";
import { Form, Input, Button, Toast } from "antd-mobile";
import { loginData } from "../../untils/types";
import api from "../../server/api";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../untils/auth";
import "./Login.css";

const Login = () => {

    const navigate = useNavigate()

    const [ account, setAccount ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')

    const changeAccount = (e: string) => {
        setAccount(e)
    }

    const changePassword = (e: string) => {
        setPassword(e)
    }

    const handleFormSubmit = (values: loginData) => {
        api.userLogin(values).then((res) => {
            if (res.status === 200) {
                setToken(res.body.token)
                navigate(-1)
            } else {
                Toast.show(res.description)
            }
        })
    }

    return (
        <div className={"login-con"}>
            <NavHeader title={"账户登录"} />
            <div className={"login-form-room"}>
                <Form
                    layout='horizontal'
                    name='loginForm'
                    footer={
                        <Button
                            block
                            type='submit'
                            color='success'
                            size='large'
                        >
                            登 录
                        </Button>
                    }
                    onFinish={handleFormSubmit}
                >
                    <Form.Item
                        label={"账户"} name='account'
                        rules={[
                            { required: true, message: '账户不能为空', validateTrigger: "onChange" },
                            { pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,7}$/, message: '账户格式不正确', validateTrigger: "onBlur" }
                        ]}
                        validateTrigger={["onBlur", "onChange"]}
                    >
                        <Input value={account} onChange={changeAccount} placeholder='请输入账户' />
                    </Form.Item>
                    <Form.Item
                        label={"密码"}
                        name='password'
                        rules={[
                            { required: true, message: '密码不能为空', validateTrigger: "onChange" },
                            { pattern: /^[a-zA-Z0-9_]{5,12}$/, message: '密码格式不正确', validateTrigger: "onBlur" }
                        ]}
                        validateTrigger={["onBlur", "onChange"]}
                    >
                        <Input value={password} onChange={changePassword} placeholder='请输入密码' type='password' />
                    </Form.Item>
                </Form>
                <div className={"login-un-register"}>还没有账户，去注册~</div>
            </div>
        </div>
    )
}

export default Login