import React from 'react';
import styled from 'styled-components';
import { Button, List, Drawer, Tabs } from 'antd';
import { GlobalOutlined, HighlightOutlined } from '@ant-design/icons';
// import { recommendSite, documentSite } from '../../assets/recommendData/recommendSite';
import { recommendSite,documentSite } from '../../../../assets/recommendData/recommendSite';

const { TabPane } = Tabs;
const RightDrawer = ({ rightVisible, onCloseRight }) => {
    return (
        <Drawer
            width="360px"
            placement="right"
            onClose={onCloseRight}
            visible={rightVisible}
            drawerStyle={{
                backgroundColor: " var(--card-bg)",
                // boxShadow: " 5px 5px 10px var(--card-sd),- 5px - 5px 10px var(--card-sf)",
                color: "var(--font-fg)"
            }}
        >
            <Tabs
                defaultActiveKey="1"
                animated={true}
                width="100%"
                style={{ color: "var(--font-fg)" }}
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
                                <IconButton type="link" href={item.href}>
                                    <IconDiv>
                                        {/* <img style={{ width: "48px", height: "48px" }} src={item.href + 'favicon.ico'} alt={item.name} /> */}
                                        <IconFont>
                                            <span>{item.name.trim().substr(0, 1)}</span>
                                        </IconFont>
                                        <img
                                            style={{ width: "48px", height: "48px", borderRadius: "10px", overflow: 'hidden', position: "absolute", backgroundColor: "#fff" }}
                                            src={item.href + '/favicon.ico'}
                                            alt={item.name}
                                            onError={(e) => { e.target.onerror = null; e.target.style = "display: none" }}
                                        />
                                    </IconDiv>
                                    <p style={{ fontSize: "12px", width: "56px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                                </IconButton>
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
                                <IconButton type="link" href={item.href}>
                                    <IconDiv>
                                        <IconFont>
                                            <span>{item.name.trim().substr(0, 1)}</span>
                                        </IconFont>
                                        <img
                                            style={{ width: "48px", height: "48px", borderRadius: "10px", overflow: 'hidden', position: "absolute", backgroundColor: "#fff" }}
                                            src={item.href + '/favicon.ico'}
                                            alt={item.name}
                                            onError={(e) => { e.target.onerror = null; e.target.style = "display: none" }}
                                        />
                                    </IconDiv>
                                    <p style={{ fontSize: "12px", width: "56px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                                </IconButton>
                            </List.Item>
                        )}
                    >
                    </List>
                </TabPane>
            </Tabs>
        </Drawer >
    );
};

// 无ico时渲染的 字体样式
export const IconFont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    background-image: rgb(88, 53, 191);
    font-size: 30px;
`
// ico图片
export const IconDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border-radius: 10px; 
    overflow: hidden;
    background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
    box-shadow:  5px 5px 10px var(--card-sd),
                -5px -5px 10px var(--card-sf);
    transition: all .3s;
    :hover {
        transform: translateY(-5px);
    }
`
// ico外层盒子
export const IconButton = styled(Button)`
    color: var(--font-fg);
`
export default RightDrawer;