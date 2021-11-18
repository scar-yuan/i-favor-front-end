import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Drawer } from 'antd';
import styled from "styled-components";
import Statistics  from '../statistics';

const ButtonStyle = styled.div`
    button {
        border: none;
        color: #090909;
        padding: 0.7em 1.7em;
        font-size: 18px;
        border-radius: 0.5em;
        background: #e8e8e8;
        border: 1px solid #e8e8e8;
        transition: all .3s;
        box-shadow: 6px 6px 12px #c5c5c5,
                    -6px -6px 12px #ffffff;
    }
    
    button:hover {
        border: 1px solid white;
    }
    
    button:active {
        box-shadow: 4px 4px 12px #c5c5c5,
                    -4px -4px 12px #ffffff;
    }`;

export default function BaseButton(props) {
    const [visible, setVisible] = useState(false);
    const tag = (props.tag === '1' ? true : false);
    // const history = useHistory();
    const showDraw = () => {
        setVisible(true);
    }

    const hideDraw = () => {
        setVisible(false);
    }
    
    return (
        <ButtonStyle>
            { tag ? (<button
                onClick = { showDraw }
            >查看学习记录</button>) : (<button
                onClick = {() => {
                    // history.push('/');
                    window.history.go(-1);
                    // clearInterval();
                }}
            >退出学习模式</button>)}
                <Drawer
                    title = "过去几天使用学习模式的时间"
                    placement = "right"
                    width = { 800 }
                    onClose = { hideDraw }
                    visible = { visible }
                    align = "center"
                >
                    <Statistics />
                </Drawer>
        </ButtonStyle>
    )
} 
