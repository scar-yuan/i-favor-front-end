import React, { useState, useImperativeHandle, forwardRef } from 'react';
// import { FlippperBaseStyle } from './flipperBaseStyle';
import './baseStyle.css';

export default function Flipper(props, ref) {
    const [flipping, setFlipping] = useState(false);
    const [type, setType] = useState('down');
    const [frontText, setFrontText] = useState('0');
    const [afterText, setAfterText] = useState('1');

    const flip = (type, front, after) => {
        //正在翻转
        if (flipping) {
            return false;
        }

        setFlipping(true);
        setType(type);
        setFrontText(front);
        setAfterText(after);

        setTimeout(() => {
            setFrontText(after);
            setFlipping(false);
        }, 600);
    }

    const flipDown = (front, after) => {
        flip('down', front, after);
    }

    const flipUp = (front, after) => {
        flip('up', front, after);
    }

    useImperativeHandle(ref, () => ({
        setFrontText: setFrontText,
        setAfterText: setAfterText,
        flipDown: flipDown,
        flipUp: flipUp,
    }));

    return (
            // <FlippperBaseStyle>
                <div className = {['M-Flipper', type, flipping ? 'go' : null].join(' ')}>
                    <div className = {`digital front number${frontText}`}></div>
                    <div className = {`digital back number${afterText}`}></div>
                </div>
            // </FlippperBaseStyle>
    )
}

Flipper = forwardRef(Flipper);