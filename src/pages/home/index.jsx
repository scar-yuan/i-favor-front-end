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
        const initTheme = async () => {
            const theme = await localStorage.getItem('theme')
            // 获取本地数据
            setThemeState(!!theme)
            setDarkTheme(!!theme)
        }
        initTheme()
    }, [])
    const onChange =  () => {
        setThemeState(!themeState)
        setDarkTheme(!!themeState)
        localStorage.setItem('theme', themeState)
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
                <Switch checked={!!themeState} style={{ margin: "5px 5px 0px 0px" }} checkedChildren="白天" unCheckedChildren="黑夜" onChange={onChange} />
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
