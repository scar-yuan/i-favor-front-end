import React, { useEffect, useState } from 'react'
import { Upload, message, Button, List, Card, Drawer, Tabs, Avatar, Popover } from 'antd';
import { UploadOutlined, AppstoreOutlined, GlobalOutlined, HighlightOutlined } from '@ant-design/icons';
import { recommendSite, documentSite } from '../../assets/recommendData/recommendSite';
import styled from 'styled-components';
import BackButton from './components/BackButton';
const { TabPane } = Tabs;

export default function Collection() {
    const [favor, setFavor] = useState([])
    const [visible, setVisible] = useState(false); // drawer打开状态
    useEffect(() => {
        const initFavor = async () => {
            let localData = await localStorage.getItem('flatFavor')
            setFavor(JSON.parse(localData).filter(item => item.type === 'site'))
        }
        initFavor()
    }, [])
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkyNmU4ZWM1NmU4NmFkZWM5Y2E4YTkiLCJpYXQiOjE2MzcwODE5NzEsImV4cCI6MTYzNzA4NTU3MX0.9Ua_1TIlA337_BxqDx-CUADizR1gZ7VAwQfMm9uA43Q`
    const uploadProps = {
        name: "bookmarkHTML",
        accept: ".html",
        action: '/api/favor',
        headers: {
            Authorization: `Bearer ${token}`
        },
        maxCount: 1,
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: percent => `${parseFloat(percent.toFixed(2))}%`,
        },
        showUploadList: false,
        // 上传文件格式判断
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`文件解析成功`);
                const { data, code } = info.file.response
                // 20003 更新了数据，20004 未更新
                if (code === 20003) {
                    let temp = flatten(data) // 扁平化
                    let saveData = temp.filter(item => item.type === 'site') // 过滤出网站
                    setFavor(saveData) // 保存到当前的状态重
                    // 持久化存储到本地
                    localStorage.setItem('originalFavor', JSON.stringify(data))
                    localStorage.setItem('flatFavor', JSON.stringify(saveData))
                }
            } else if (info.file.status === 'error') {
                message.error(`文件解析失败`);
            }
        },
    }
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    function flatten(arr) {
        return arr.reduce((result, item) => {
            return result.concat(item, (Array.isArray(item?.children) ? flatten(item?.children) : []));
        }, []);
    }

    return (
        <CollectionContainer>
            <BackButton />
            <Upload
                {...uploadProps}
            >
                <UploadButton icon={<UploadOutlined />}>导入收藏夹</UploadButton>
            </Upload>
            {/* 展示所有网站的 List */}
            <ListSite
                itemLayout="horizontal"
                dataSource={favor}
                size="small"
                // pagination="bottom"
                renderItem={item => (
                    <ListItem>
                        <List.Item.Meta
                            avatar={<Avatar src={item.icon} />}
                            title={
                                <Popover content={item.name}>
                                    <a style={{ color: "var(--font-fg)" }} href={item.href}>{item.name.substr(0, 35)}</a>
                                </Popover>
                            }
                        />
                    </ListItem>
                )}
            />

            {/* 侧边弹出框按钮 */}
            <OpenButton
                onClick={showDrawer}
                size="large"
            >
                <AppstoreOutlined />
            </OpenButton>
            <Drawer
                width="360px"
                placement="right"
                onClose={onClose}
                visible={visible}
            >
                <Tabs
                    defaultActiveKey="1"
                    animated={true}
                    width="100%"
                >
                    <TabPane
                        tab={
                            <span>
                                <GlobalOutlined />
                                网站推荐
                            </span>
                        }
                        key="1"
                    >
                        <List
                            grid={{ column: 3 }}
                            dataSource={recommendSite}
                            renderItem={item => (
                                <List.Item>
                                    <Button type="link" href={item.href}>
                                        <IconDiv>
                                            {/* <img style={{ width: "48px", height: "48px" }} src={item.href + 'favicon.ico'} alt={item.name} /> */}
                                            <IconFont>
                                                <span>{item.name.trim().substr(0, 1)}</span>
                                            </IconFont>
                                            <img
                                                style={{ width: "48px", height: "48px", position: "absolute", backgroundColor: "#fff" }}
                                                src={item.href + '/favicon.ico'}
                                                alt={item.name}
                                                onError={(e) => { e.target.onerror = null; e.target.style = "display: none" }}
                                            />
                                        </IconDiv>
                                        <p style={{ fontSize: "12px", color: "#222226", width: "56px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                                    </Button>
                                </List.Item>
                            )}
                        >

                        </List>
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <HighlightOutlined />
                                官方文档
                            </span>
                        }
                        key="2"
                    >
                        <List
                            grid={{ column: 3 }}
                            dataSource={documentSite}
                            renderItem={item => (
                                <List.Item>
                                    <Button type="link" href={item.href}>
                                        <IconDiv>
                                            <IconFont>
                                                <span>{item.name.trim().substr(0, 1)}</span>
                                            </IconFont>
                                            <img
                                                style={{ width: "48px", height: "48px", position: "absolute", backgroundColor: "#fff" }}
                                                src={item.href + '/favicon.ico'}
                                                alt={item.name}
                                                onError={(e) => { e.target.onerror = null; e.target.style = "display: none" }}
                                            />
                                        </IconDiv>
                                        <p style={{ fontSize: "12px", color: "#222226", width: "56px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                                    </Button>
                                </List.Item>
                            )}
                        >
                        </List>
                    </TabPane>
                </Tabs>
            </Drawer >
        </CollectionContainer >
    )
}
// 外层盒子
const CollectionContainer = styled.div`
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
}
`

// 网站列表
const ListSite = styled(List)`
    width: 300px;
    height: 95vh;
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
const ListItem = styled(List.Item)`
    color: var(--font-fg);
    border-bottom: none !important;
    background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
    box-shadow:  5px 5px 10px var(--card-sd),
                -5px -5px 10px var(--card-sf);
`
// 上传按钮
const UploadButton = styled(Button)`
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
// 打开侧边栏button
const OpenButton = styled(Button)`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
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
// 无ico时渲染的 字体样式
const IconFont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    background-image: rgb(88, 53, 191);
    font-size: 30px;
`
// ico图片
const IconDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border-radius: 10px; 
    background-color: red;
    background: linear-gradient(145deg, #e6e6e6, #ffffff);
    box-shadow:  5px 5px 10px #c4c4c4,
                    -5px -5px 10px #ffffff;
    transition: all .3s;
    :hover {
        transform: translateY(-5px);
    }
`
