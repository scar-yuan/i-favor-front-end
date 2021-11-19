import React, { useState } from 'react';
import { Drawer, Modal } from 'antd';
import styled from "styled-components";
import { DonutChart } from 'bizcharts';
import Statistics  from '../statistics';

const ButtonStyle = styled.div`
    button {
        border: none;
        padding: 0.7em 1.7em;
        font-size: 18px;
        border-radius: 0.5em;
        background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
        border: 1px solid #e8e8e8;
        transition: all .3s;
        box-shadow: 6px 6px 12px var(--card-sd),
                    -6px -6px 12px var(--card-sf);
    }
    

    
    button:active {
        box-shadow: 4px 4px 12px var(--card-sd),
                    -4px -4px 12px var(--card-sf);
    }`;

export default function BaseButton(props) {
    const [visible, setVisible] = useState(false);
    const [ modalVisible, setModalVisible] = useState(false);
    const tag = (props.tag === '1' ? true : false);
    const data = [
        {
            type: "英语",
            value: 27,
        },
        {
            type: "高数",
            value: 25,
        },
        {
            type: "算法",
            value: 18,
        },
        {
            type: "写作",
            value: 15,
        },
        {
            type: "音乐",
            value: 10,
        },
        {
            type: "其它",
            value: 5,
        },
    ];
    // const history = useHistory();
    const showDraw = () => {
        setVisible(true);
    }

    const hideDraw = () => {
        setVisible(false);
    }
    
    const exit = () => {
        window.history.go(-1);
    }

    const modalCancel = () => {
        setModalVisible(false);
    }
    return (
        <ButtonStyle>
            { tag ? (<button
                onClick = { showDraw }
            >查看学习记录</button>) : (<button
                onClick = {() => {
                    // history.push('/');
                    setModalVisible(true);
                    // clearInterval();
                }}
            >退出学习模式</button>)}
                <Modal 
                    visible={ modalVisible } 
                    onOk={ exit } 
                    onCancel={ modalCancel }
                    bodyStyle={{
                        backgroundColor: " var(--card-bg)",
                        color: "var(--font-fg)"
                    }}
                    cancelText = "继续学习"
                    okText = "确认退出"
                >
                    <DonutChart
                        data={data || []}
                        title={{
                            visible: true,
                            text: "今日学习情况",
                        }}
                        autoFit
                        // description={{
                        //     visible: true,
                        //     text: "环图的外半径决定环图的大小，而内半径决定环图的厚度。",
                        // }}
                                height={350}
                        radius={0.8}
                        padding="auto"
                        angleField="value"
                        colorField="type"
                        pieStyle={{ stroke: "white", lineWidth: 5 }}
                    />
                </Modal>
                <Drawer
                    title = "过去几天使用学习模式的时间"
                    placement = "right"
                    width = { 800 }
                    onClose = { hideDraw }
                    visible = { visible }
                    display = "flex"
                    drawerStyle={{
                        backgroundColor: " var(--card-bg)",
                        color: "var(--font-fg)"
                    }}
                    bodyStyle = {{ marginTop: "10vh"}}
                >
                    <Statistics />
                </Drawer>
        </ButtonStyle>
    )
} 
