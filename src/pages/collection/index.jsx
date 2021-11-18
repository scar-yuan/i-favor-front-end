
import React, { useEffect, useState, useRef } from 'react'
import { Upload, message, Button, List, Popover, Spin } from 'antd';
import { UploadOutlined, AppstoreOutlined, QuestionCircleOutlined, DeploymentUnitOutlined, AlignLeftOutlined, HomeOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { recommendSite } from '../../assets/recommendData/recommendSite';
import { flatten } from '../../utils/flatten';
import MyFavorList from './components/MyFavorList';
import SortCollect from './components/SortCollect'
// 不用这个
import RightDrawer from './components/RightDrawer';
import StepDrawer from './components/StepDrawer';
import { IconButton, IconDiv, IconFont } from './components/RightDrawer';
// 尝试拖拽
// import { useDrag } from 'react-dnd'
// 定义拖拽类型
// import { ItemTypes } from './Constants';


export default function Collection() {
    const [favor, setFavor] = useState([])
    const [isTemp, setIsTemp] = useState(false) // 是否使用临时数据
    const [isLoadingUpload, setIsLoadingUpload] = useState(false) // 是否展示全局loading
    // const [isDataTips, setIsDataTips] = useState(false) // 设置使用数据提示
    const [rightVisible, setRightVisible] = useState(false); // 右边drawer打开状态
    const [leftVisible, setLeftVisible] = useState(false)   // 左侧 drawer 打开状态
    const [stepVisible, setStepVisible] = useState(false) //控制顶部 step 打开状态
    const [sortVisible, setSortVisible] = useState(false) // 控制整理文件夹打开状态
    // 拖拽API
    // const [{ opacity }, dragRef] = useDrag(
    //     () => ({
    //         type: ItemTypes.SITE,
    //         collect: (monitor) => ({
    //             opacity: monitor.isDragging() ? 0.1 : 1
    //         })
    //     }),
    //     []
    // )
    // 初始化从本地存储中取数据
    useEffect(() => {
        const initFavor = async () => {
            let localData = await localStorage.getItem('flatFavor')
            let parseData = JSON.parse(localData)
            if (parseData == null) {
                // 使用临时数据
                setIsTemp(true)
                message.info('您还没有登录或者导入收藏夹噢~，为您展示推荐网站')
            } else {
                // 不使用临时数据
                setIsTemp(false)
                message.success('您已登录为您加载您的数据')
                setFavor(JSON.parse(localData)?.filter(item => item.type === 'site'))
            }
        }
        initFavor()
    }, [])
    // 测试的时候采用接口工具获取到的 token
    // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkyNmU4ZWM1NmU4NmFkZWM5Y2E4YTkiLCJpYXQiOjE2MzcwODE5NzEsImV4cCI6MTYzNzA4NTU3MX0.9Ua_1TIlA337_BxqDx-CUADizR1gZ7VAwQfMm9uA43Q`
    const token = JSON.parse(localStorage.getItem("token"))?.token
    // isTemp 为 true 展示临时数据，表示用户为上传数据
    // Upload 组件的 props
    const uploadProps = {
        name: "bookmarkHTML",
        accept: ".html",
        action: '/api/favor',
        headers: {
            Authorization: `Bearer ` + token
        },
        disabled: !token,
        showUploadList: false,
        maxCount: 1,
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: percent => `${parseFloat(percent.toFixed(2))}%`,
        },
        // 上传文件格式判断
        onChange(info) {
            if (info.file.status === 'uploading') {
                setIsLoadingUpload(true)
            }
            if (info.file.status === 'done') {
                message.success(`文件解析成功`);
                setIsLoadingUpload(false)
                const { data, code } = info.file.response
                // 20003 更新了数据，20004 未更新 ，字符串
                if (code === "20003" && !localStorage.getItem("flatFavor")) {
                    let temp = flatten(data) // 扁平化
                    let saveData = temp.filter(item => item.type === 'site') // 过滤出网站
                    setIsTemp(false) // 立即修改状态为，不使用临时数据
                    setFavor(saveData) // 保存到当前的状态重
                    // 持久化存储到本地
                    localStorage.setItem('originalFavor', JSON.stringify(data))
                    localStorage.setItem('flatFavor', JSON.stringify(saveData))
                }
            } else if (info.file.status === 'error') {
                setIsLoadingUpload(false)
                message.error(`文件解析失败`);
            }
        },
    }
    // 未登录提示
    const handleTips = () => {
        if(!token) {
            message.warn("你还没有登录噢，请先登录再进行操作")
        }
    }
    // 打开抽屉的按钮
    const showLeftDrawer = () => {
        setLeftVisible(true)
    }
    const showRightDrawer = () => {
        setRightVisible(true);
    };
    const showStepDrawer = () => {
        setStepVisible(true)
    }
    const showSortDrawer = () => {
        setSortVisible(true)
    }
    // 抽屉中关闭的抽屉的方法
    const onCloseRight = () => {
        setRightVisible(false);
    };
    const onCloseLeft = () => {
        setLeftVisible(false)
    }
    const onCloseStep = () => {
        setStepVisible(false)
    }
    const onCloseSort = () => {
        setSortVisible(false)
    }

    return (
        <CollectionContainer isLoadingUpload={isLoadingUpload}>
            <SpinPosition size="large" spinning={isLoadingUpload} />
            {/* 定位 + flex 布局 */}
            {/* <BackButton /> */}
            <ButtonBox>
                {/* 顶部弹出框按钮 */}
                <Popover
                    placement="right"
                    content={"返回首页"}
                >
                    <OpenButton
                        type="link"
                        href="/"
                        style={{ width: "46px", height: "40px", lineHeight: "40px", fontSize: "18px" }}
                    >
                        <HomeOutlined />
                    </OpenButton>
                </Popover>
                {/* 使用指南 */}
                <Popover
                    placement="right"
                    content={"如何使用"}
                >
                    <OpenButton
                        onClick={showStepDrawer}
                        size="large"
                    // style={{ right: 0, left: "50px" }}
                    >
                        <QuestionCircleOutlined />
                    </OpenButton>
                </Popover>
                {/* 上传收藏夹 */}
                <Upload
                    {...uploadProps}
                >
                    <Popover
                        placement="right"
                        content={"上传收藏夹"}
                    >
                        <UploadButton onClick={handleTips} icon={<UploadOutlined />}></UploadButton>
                    </Popover>

                </Upload>
                {/* 展示所有网站的 List，左侧 Drawer */}
                <Popover
                    placement="right"
                    content={"我的收藏夹"}
                >
                    <OpenButton
                        onClick={showLeftDrawer}
                        size="large"
                    // style={{ right: 0, left: "10px" }}
                    >
                        <AlignLeftOutlined />
                    </OpenButton>
                </Popover>
                {/* 推荐列表*/}
                <Popover
                    placement="right"
                    content={"打开推荐列表"}
                >
                    <OpenButton
                        onClick={showRightDrawer}
                        size="large"
                    >
                        <AppstoreOutlined />
                    </OpenButton>
                </Popover>
                {/* 推荐列表*/}
                <Popover
                    placement="right"
                    content={"整理文件夹"}
                >
                    <OpenButton
                        onClick={showSortDrawer}
                        size="large"
                    >
                        <DeploymentUnitOutlined />
                    </OpenButton>
                </Popover>

            </ButtonBox>
            {/* 我的收藏列表，展示的是扁平化后的数据，判断当前列表是不是本地的临时数据 */}
            <MyFavorList favor={favor} leftVisible={leftVisible} onCloseLeft={onCloseLeft} />
            {/* 步骤条抽屉 */}
            <StepDrawer onCloseStep={onCloseStep} stepVisible={stepVisible} />
            {/* 右侧抽屉 */}
            <RightDrawer onCloseRight={onCloseRight} rightVisible={rightVisible} />
            {/* 整理文件夹组件写在这里，传入 onCloseSort,sortVisible,favor */}
            <SortCollect onCloseSort={onCloseSort} sortVisible={sortVisible} favor={JSON.parse(localStorage.getItem('originalFavor'))}/>
            {/* 中间布局块，待分离 */}
            <CenterContainer>
                <List
                    grid={{
                        gutter: 16,
                        xs: 2,
                        sm: 3,
                        md: 4,
                        lg: 6,
                        xl: 8,
                        xxl: 3,
                    }}
                    dataSource={isTemp ? recommendSite : favor}
                    renderItem={item => (
                        // 拖拽
                        <List.Item /* ref={dragRef}  style={{ opacity }}*/>
                            <IconButton type="link" href={item.href} target="_blank">
                                <IconDiv
                                    style={{ width: "80px", height: "80px" }}
                                >
                                    {/* <img style={{ width: "48px", height: "48px" }} src={item.href + 'favicon.ico'} alt={item.name} /> */}
                                    <IconFont
                                        style={{ fontSize: "36px", fontWeight: "bold" }}
                                    >
                                        <span>{item.name.trim().substr(0, 1)}</span>
                                    </IconFont>
                                    <img
                                        style={{ width: "70px", height: "70px", borderRadius: "10px", overflow: 'hidden', position: "absolute", backgroundColor: "#fff" }}
                                        src={item.icon}
                                        alt={item.name}
                                        onError={(e) => { e.target.onerror = null; e.target.style = "display: none" }}
                                    />
                                </IconDiv>
                                <p style={{ fontSize: "12px", width: "80px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                            </IconButton>
                        </List.Item>
                    )}
                />
            </CenterContainer>
        </CollectionContainer >
    )
}
// 外层盒子
const CollectionContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
    overflow-y: ${props => props.isLoadingUpload ? "hidden" : ""};
    .list{
        color: var(--font-fg);
        border: none;
        border-radius: 10px; 
        background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
        box-shadow:  5px 5px 10px var(--card-sd),
                    -5px -5px 10px var(--card-sf);
        transition: all 0.3s ease 0s;
        cursor: pointer;
        :hover {
            transform: translateY(-10px);
    }
    .centerContainer {
        width: 500px;
        background-color: red;
    }
}
`
const SpinPosition = styled(Spin)`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0,.5);
    text-align: center;
    line-height: 100vh;
    z-index: 100;
    overflow-y: hidden;
`
// 网站列表
export const ListSite = styled(List)`
    align-self: flex-end;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    user-select: none;
    color: var(--font-fg);
    border-radius: 10px; 
    background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
    box-shadow:  5px 5px 10px var(--card-sd),
                -5px -5px 10px var(--card-sf);
    ::-webkit-scrollbar{
        width: 8px;
        height: 8px;
        background: linear-gradient(to bottom, var(--card-bg), var(--card-fg));;
    }
 
    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track
    {
        /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); */
        border-radius: 10px;
        background: linear-gradient(to bottom, var(--card-bg), var(--card-fg));
        -webkit-box-shadow:  5px 5px 2px var(--card-sd),
                            -5px -5px -2px var(--card-sf);
    }
    
    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb
    {
        height: 10px;
        border-radius: 10px;
        /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3); */
        -webkit-box-shadow:  5px 5px 2px var(--card-sd),
                            -5px -5px -2px var(--card-sf);
        background-color: white;
        cursor: pointer;
    }
        
`
// 每个网站
export const ListItem = styled(List.Item)`
    color: var(--font-fg);
    border-bottom: none !important;
    background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
    box-shadow:  5px 5px 10px var(--card-sd),
                -5px -5px 10px var(--card-sf);
`
// 上传按钮
const UploadButton = styled(Button)`
width: 46px;
height: 40px;
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
        color: #2b2b2b;
    } 
`
// Button 容器
const ButtonBox = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
`
// 打开侧边栏button
const OpenButton = styled(Button)`
    width: 46px;
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
        color: #2b2b2b;
        background-color: #fff;
    } 
`
// 首页主拖拽区
const CenterContainer = styled.main`
    padding: 50px 100px 50px 100px;
    
`