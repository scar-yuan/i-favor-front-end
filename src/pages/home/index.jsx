import React, { useEffect, useState, useContext } from "react";
// import { Link } from 'react-router-dom'
import styled from "styled-components";
import { Button, Row, Switch, Avatar, Modal, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import StudyCard from "./components/StudyCard";
import TodoCard from "./components/TodoCard";
import CollectionCard from "./components/CollectionCard";
import BigTime from "./components/BigTime";
import SearchView from "./components/SearchView";
// import setDarkTheme from "../../assets/untils/darkTheme";

import { LoginContext, USER_LOGOUT, ThemeContext } from "../../store/context";
function Home(props) {
    const [login, setLogin] = useState(false);
    const { loginState, dispatch } = useContext(LoginContext);
    // 采用全局样式，用这个就行了
    const [themeType, setThemeType] = useContext(ThemeContext);
    const [searchData, setSearchData] = useState({})
    const onChange = () => {
        setThemeType(!themeType);
        localStorage.setItem("theme", !themeType);
    };
    //设置登录态
    useEffect(() => {
        setLogin(loginState.isLogin);
    }, [loginState]);

    const handleLogout = () => {
        Modal.confirm({
            title: '你确定要退出吗',
            content: '退出后无法使用过多服务噢~',
            okText: '确定',
            onOk() {
                message.success('退出成功！')
                localStorage.removeItem("token");
                // 没必要清空
                // localStorage.removeItem("flatFavor");
                // localStorage.removeItem("originalFavor")
                dispatch({
                    type: USER_LOGOUT,
                    userLogout: { username: "", token: "", isLogin: false },
                });
            }
        })

    };
    return (
        <div>
            <Row justify="space-between">
                {login ? (
                    <Row align="middle">
                        <Avatar
                            size="small"
                            style={{ margin: "5px 5px 0px 5px" }}
                            icon={<UserOutlined />}
                        />
                        <span style={{ color: "var(--font-fg)", cursor: "pointer" }} onClick={handleLogout}>{loginState.username}</span>
                    </Row>
                ) : (
                    <LoginButton type="link" href="/login">
                        登录
                    </LoginButton>
                )}

                {/* 模式切换 */}
                <Switch
                    checked={themeType}
                    style={{ margin: "5px 5px 0px 0px" }}
                    checkedChildren="白天"
                    unCheckedChildren="黑夜"
                    onChange={onChange}
                />
            </Row>
            <BigTime />
            <SearchView setSearchData={setSearchData} />
            <Section>
                <TodoCard />
                <CollectionCard searchData={searchData} />
                <StudyCard />
            </Section>
        </div>
    );
}


const Section = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 50px 100px 0px 100px;
`;
const LoginButton = styled(Button)`
    margin: 10px;
    color: var(--font-fg);
    border: none;
    border-radius: 10px; 
    background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
    box-shadow:  5px 5px 10px var(--card-sd),
                -5px -5px 10px var(--card-sf);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    :hover {
        color: var(--hover-fg);
        color: #2b2b2b;
        background-color: #fff;
    }
`
export default Home;