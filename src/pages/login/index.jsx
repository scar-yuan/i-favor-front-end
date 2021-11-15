import React from "react";
import LoginText from "../../components/animate/LoginText";
import MyParticles from "../../components/animate/Particle";
// import axios from "axios";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LoginWrap } from "./StyledLogin";
import logo from "../../assets/logo/logo192.png";
function Login() {
  const onFinish = (values) => {
    // axios.get('/login',{
    //   ...values
    // })
    console.log(values);
  };
  const [form] = Form.useForm();

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
            <div className="logo">
              <img src={logo} alt="" width="80px" height="80px" />
            </div>
            <div className="form-title">sign in to ifavor</div>
            <div className="form-wrap">
              <Form
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      validator: checkUser,
                      // message: "Please input your nickname",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                    className="input"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      validator: checkPassword,
                      // message: "Please input your passwprd",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    className="input"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <a className="login-form-forgot" href="/login">
                    Forgot password
                  </a>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </LoginWrap>
    </>
  );
}

export default Login;
