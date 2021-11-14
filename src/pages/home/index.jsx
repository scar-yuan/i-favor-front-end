import React from 'react'
import {Link} from 'react-router-dom'

function Home(props) {
    const {username,login} = props
    return (
        <div>
            <Link to="/todolist">代办项</Link><br/>
            <Link to="/collection">收藏夹</Link><br/>
            <Link to="/study">学习</Link><br/>
            <h1>我的名字：{username}</h1>
            <button onClick={() => login('yyy')}>登录</button>
        </div>
    )
}

export default Home
