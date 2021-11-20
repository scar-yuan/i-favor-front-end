import React, { useState, useEffect, useRef } from 'react';
import Flipper from '../flipper';
import { ClockStyle } from './clockStyle';

export default function Clock(props, ref) {
    const [running, setRunning] = useState(false);// 记录时钟是否已开始运行
    const [ytd, setYtd] = useState(' 0000 年 00 月 00 日');
    const hour1 = useRef();
    const hour2 = useRef();
    const minute1 = useRef();
    const minute2 = useRef();
    const second1 = useRef();
    const second2 = useRef();
    const flipObjs = [hour1, hour2, minute1, minute2, second1, second2];// 记录翻转对象
    const [nowTime, setNowTime] = useState('000000');
    const calc = (v) => {
        return v < 10 ? '0' + v  : String(v);
    }
    const formatDate = (date) => {
        // 格式化年、月、日、时、分、秒
        let o = {
            'h': calc(date.getHours()),
            'i': calc(date.getMinutes()),
            's': calc(date.getSeconds()),
        }
        const out = {
            h_s: o['h'] + o['i'] + o['s'],
            year: String(date.getFullYear()),
            mouth: calc(date.getMonth() + 1),
            day: calc(date.getDate()), 
        }
        return out;
    }

    function init() {
        const now = new Date();
        const timeStr = formatDate(new Date(now.getTime()));
        for (let i = 0; i < flipObjs.length; i++) {
            flipObjs[i].current.setFrontText(timeStr.h_s[i]);
        }
        setYtd(` ${timeStr.year} 年 ${timeStr.mouth} 月 ${timeStr.day} 日`);
    }

    useEffect(() => {
        if (!running) {
            setRunning(true);
            init();
        }
        const timer = setTimeout(() => {
            const now = new Date();
            const time = formatDate(now);
            const nextTime = formatDate(new Date(now.getTime() + 1000));
            for (let i = 0; i < flipObjs.length; i++) {
                // flipObjs[i].current.getText();
                if (time.h_s[i] === nextTime.h_s[i]) {
                    continue;
                }
                flipObjs[i].current.flipDown(time.h_s[i], nextTime.h_s[i])
            }
            setNowTime(nextTime.h_s);
            console.log(nowTime);
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [nowTime]);
    
    return (
        <ClockStyle>
            <div className = "clock">
                <Flipper ref = { hour1 }/>
                <Flipper ref = { hour2 }/>
                <em>:</em>
                <Flipper ref = { minute1 }/>
                <Flipper ref = { minute2 }/>
                <em>:</em>
                <Flipper ref = { second1 }/>
                <Flipper ref = { second2 }/>
            </div>
            <p
                style = {{
                    textAlign: 'center',
                    fontSize: '20px',
                    letterSpacing: 'normal'
                }}
            >{ytd}</p>
        </ClockStyle>
    )
}