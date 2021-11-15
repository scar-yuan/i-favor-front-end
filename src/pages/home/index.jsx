import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import styled from "styled-components";
import { Button, Row, Switch, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import StudyCard from './components/StudyCard'
import TodoCard from './components/TodoCard';
import CollectionCard from './components/CollectionCard';
import BigTime from './components/BigTime';
import SearchView from './components/SearchView';
import setDarkTheme from '../../assets/untils/darkTheme'

function Home(props) {
    const [login, setLogin] = useState(false)
    const [themeState, setThemeState] = useState(false) // false 是浅色，true 是深色

    // 初始化主题状态
    useEffect(() => {
        //1.localStorage操作是同步的
        //2.setState是异步的
        //3.localStorage.getItem返回值是字符串，转boolean都是true，没有时是null
        let localThemeState
        if(localStorage.getItem('theme') === null ||localStorage.getItem('theme') === 'false'){
            localThemeState = false
        } else {
            localThemeState = true
        }
         setThemeState(localThemeState)
         setDarkTheme(localThemeState)
    },[])
    const onChange =  () => {
        setThemeState(!themeState)
        setDarkTheme(!themeState)
        localStorage.setItem('theme', !themeState)
    }
    return (
        <div>
            <Row justify="space-between">
                {
                    login
                        ? <Row align="middle"><Avatar size="small" style={{ margin: "5px 5px 0px 5px" }} icon={<UserOutlined />} /> <span>小丞同学</span> </Row>
                        : <Button type="link" href="/login" >登录</Button>
                }

                {/* 模式切换 */}
                <Switch checked={themeState} style={{ margin: "5px 5px 0px 0px" }} checkedChildren="黑夜" unCheckedChildren="白天" onChange={onChange} />
            </Row>
            <BigTime />
            <SearchView />
            <Section>
                <TodoCard />
                <CollectionCard />
                <StudyCard />
            </Section>
        </div>
    )
}

const Section = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 50px 100px 0px 100px;
`
export default Home
