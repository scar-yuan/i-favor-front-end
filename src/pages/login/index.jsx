import React from "react";
import LoginText from "../../components/animate/LoginText";
import MyParticles from "../../components/animate/Particle";
import { Form, Input, Button,Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LoginWrap } from "./StyledLogin";
import logo from '../../assets/logo/logo192.png'
function Login() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
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
            <div className="logo" >
              <img src={logo} alt="" width="80px" height="80px"/>
            </div>
            <div className="form-title">sign in to ifavor</div>
            <div className="form-wrap">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Please input your Username!" },
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
                    { required: true, message: "Please input your Password!" },
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
