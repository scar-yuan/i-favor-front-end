import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
const BigTime = () => {
    const [day, setDay] = useState('2021年11月14日');
    const [time, setTime] = useState('00:00:00')
    useEffect(() => {
        setTimeout(() => {
            setDay(dayjs().format("YYYY年MM月DD日"))
            setTime(dayjs().format("hh:mm:ss"))
        }, 1000)
    }, [day, time])
    return (
        <>
            <Time>
                <span>{time}</span>
                <p>{day}</p>
            </Time>

        </>
    );
};
const Time = styled.div`
    color: var(--font-fg);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 100px;
    letter-spacing: 8px;
    user-select: none;
    p {
        font-size: 20px;
        margin-top: 20px;
        letter-spacing: normal;
    }
`
export default BigTime;