import React, { useState, useRef } from 'react';
import { TimerStyle } from './timerStyle';
import Flipper from '../flipper';

export default function Timer() {
    const [running, setRunning] = useState(false);// 记录时钟是否已开始运行
    const h1 = useRef();
    const h2 = useRef();
    const m1 = useRef();
    const m2 = useRef();
    const s1 = useRef();
    const s2 = useRef();
    const flipObjs = [h1, h2, m1, m2, s1, s2];// 记录翻转对象
    let [timer, h, m, s] = [null, 0, 0, 0];
    const add = () => {
        s += 1;

        if (s === 60) {
            s = 0;
            m += 1;
        }
        if (m === 60) {
            m = 0;
            h += 1;
        }

        let nextTime = [h, m, s];
        nextTime = nextTime.map((v) => ( v < 10 ? '0' + v : v));
        return nextTime.join('');
    }

    const calcNowTime = () => {
        let times = [h, m, s];
        times = times.map((v) => ( v < 10 ? '0' + v : v));
        return times.join('');
    }
    const run = () => {
        timer = setInterval(() => {
            const time = calcNowTime();
            const nextTime = add();
            for (let i = 0; i < flipObjs.length; i++) {
                // flipObjs[i].current.getText();
                if (time[i] === nextTime[i]) {
                    continue;
                }
                flipObjs[i].current.flipDown(time[i], nextTime[i])
            }
        }, 1000);
    }
    
    run();
    return (
        <TimerStyle>
            <div 
                className = "timer"
                style = {{
                    display: 'inlineBlock',
                }}
            >
                <Flipper ref = { h1 }/>
                <Flipper ref = { h2 }/>
                <em>:</em>
                <Flipper ref = { m1 }/>
                <Flipper ref = { m2 }/>
                <em>:</em>
                <Flipper ref = { s1 }/>
                <Flipper ref = { s2 }/>
            </div>
        </TimerStyle>
    )
}