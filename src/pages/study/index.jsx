import React from 'react'
import { Row, Col } from 'antd';
import Clock from './components/clock';
import Timer from './components/timer';
import BaseButton from './components/baseButton';

export default function index() {

    return (
        <div
            className = "LearningMode"
            style = {{
                height: '100vh',
                paddingTop: '15vh',
                color: 'var(--font-fg)'
            }}
        >
            <Row 
                align = 'center'
                height = { 100 }
            >
                <Clock />
            </Row>
            <Row>
                <Col 
                    span = { 10 }
                    align = 'right'
                >                   
                    <p
                        style = {{
                            fontSize: '22px',
                            letterSpacing: 'normal',
                            marginTop: '11%'
                        }}
                    >{`当前学习时间：`}</p>
                </Col>
                <Col><Timer /></Col>
            </Row>
            <Row
                align = 'center'
            >
                <Col span = { 4 }><BaseButton tag = { '1' } /></Col>
                {/* <Col span = { 3 }><BaseButton tag = { '2' }/></Col> */}
                <Col><BaseButton tag = { '3' }/></Col>
            </Row>
        </div>
    )
}
