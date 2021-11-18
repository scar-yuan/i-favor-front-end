import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import LoginText from "../../components/animate/LoginText";
import MyParticles from "../../components/animate/Particle";
import instance from "../../utils/http";

import { Form, Input, Button, Checkbox, Tabs, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { LoginContext, USER_LOGIN } from "../../store/context";

import { LoginWrap } from "./StyledLogin";
import logo from "../../assets/logo/logo192.png";

function Login() {
  const history = useHistory();
  const { dispatch } = useContext(LoginContext);
  const [currentTab, setCurrentTab] = useState("1");
  const onFinishRegister = (values) => {
    instance
      .post("/user/register", {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        successRegister();
        console.log(res);
      },(err)=>{
        errorRegister();
        console.log(err);
      });
  };
  const onFinishLogin = (values) => {
    instance
      .post("/user/login", {
        username: values.username,
        password: values.password,
      })
      .then(
        (res) => {
          successLogin();
          localStorage.setItem("token",JSON.stringify({...res.data.data,isLogin:true}));
          dispatch({ type: USER_LOGIN, userLogin:{...res.data.data,isLogin:true}})
          history.push("/");
          console.log(res);
        },
        (err) => {
          errorLogin();
          console.log(err);
        }
      );
  };
  const successLogin = () => {
    message.success("登录成功");
  };
  const errorLogin = () => {
    message.error("登陆失败");
  };
  const successRegister = () => {
    message.success("注册成功");
  };
  const errorRegister = () => {
    message.error("注册失败");
  };
  const [form1, form2] = Form.useForm();
  const { TabPane } = Tabs;
  // 用户名校验
  const checkUser = async (_, value) => {
    let reg = /^[a-zA-Z0-9]{4,16}$/;
    if (value == null) {
      return Promise.reject(new Error("请输入用户名"));
    } else {
      if (value.length === 0) {
        return Promise.reject(new Error("请输入用户名"));
      }
      if (!reg.exec(value) && value.length > 0) {
        return Promise.reject(new Error("用户名不合规范(4~16包含数字、字母)"));
      } else {
        return Promise.resolve();
      }
    }
  };
  // 密码校验
  const checkPassword = (_, value) => {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    if (value == null) {
      return Promise.reject(new Error("请输入密码"));
    }
    if (value.length === 0) {
      return Promise.reject(new Error("请输入密码"));
    }
    if (!reg.exec(value) && value.length > 0) {
      return Promise.reject(new Error("密码不合规范(6~16包含数字、字母)"));
    } else {
      return Promise.resolve();
    }
  };
  // 返回首页
  const handleBack = () => {
    history.replace("/");
  };
  // tab切换
  const handleChangeTab = (key) => {
    setCurrentTab(key);
    console.log(key);
  };
  return (
    <>
      <LoginWrap>
        <MyParticles></MyParticles>
        {/* 左边文字 */}
        <div className="login-logo">
          <div className="opacity">
            <LoginText />
          </div>
        </div>
        {/* 右边表单 */}
        <div className="login-right">
          <div className="opacity">
            <div
              className="logo"
              onClick={() => {
                handleBack();
              }}
            >
              <img
                src={logo}
                alt="logo"
                title="点击返回首页"
                width="80px"
                height="80px"
              />
            </div>
            <div className="form-title">sign in to ifavor</div>
            {/* 注册登陆切换 */}
            <Tabs
              defaultActiveKey="1"
              centered
              size="large"
              tabBarGutter="50px"
              onTabClick={(key, e) => {
                handleChangeTab(key);
              }}
            >
              <TabPane tab="立即登录" key="1">
                <div className="form-wrap">
                  <Form
                    form={form1}
                    name="normal_login2"
                    className="login-form"
                    // initialValues={{ remember: true }}
                    onFinish={onFinishLogin}
                    onFinishFailed={() => {
                      console.log("验证失败");
                    }}
                  >
                    <Form.Item
                      name="username"
                      rules={
                        currentTab === "1"
                          ? [
                              {
                                // validator: checkUser,
                                required: true,
                                message: "请输入用户名",
                              },
                            ]
                          : []
                      }
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                        className="input"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={
                        currentTab === "1"
                          ? [
                              {
                                validator: checkPassword,
                                // message: "Please input your passwprd",
                              },
                            ]
                          : []
                      }
                    >
                      <Input
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                        className="input"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        noStyle
                      >
                        <Checkbox>记住我</Checkbox>
                      </Form.Item>
                      <a className="login-form-forgot" href="/login">
                        忘记密码
                      </a>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        立即进入
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </TabPane>
              <TabPane tab="我是新用户" key="2">
                <div className="form-wrap">
                  <Form
                    form={form2}
                    name="normal_login2"
                    className="login-form"
                    // initialValues={{ remember: true }}
                    onFinish={onFinishRegister}
                  >
                    <Form.Item
                      name="username"
                      rules={
                        currentTab === "2"
                          ? [
                              {
                                validator: checkUser,
                                // message: "Please input your nickname",
                              },
                            ]
                          : []
                      }
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                        className="input"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={
                        currentTab === "2"
                          ? [
                              {
                                validator: checkPassword,
                                // message: "Please input your passwprd",
                              },
                            ]
                          : []
                      }
                    >
                      <Input
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                        className="input"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        注册
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </LoginWrap>
    </>
  );
}

export default Login;
