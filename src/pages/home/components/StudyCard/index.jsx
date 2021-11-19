import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import styled from "styled-components";
import { Chart, Point, Area,	Annotation,	Axis,	Coordinate,	registerShape,	registerAnimation } from 'bizcharts';
import MyButton from '../Button';

// 自定义Shape 部分
registerShape('point', 'pointer', {
	draw(cfg, container) {

		const group = container.addGroup();
		console.log(cfg)
		const center = this.parsePoint({ x: 0, y: 0 }); // 获取极坐标系下画布中心点
		const start = this.parsePoint({ x: 0, y: 0.5 }); // 获取极坐标系下起始点
		// 绘制指针
		const line = group.addShape('line', {
			attrs: {
				x1: center.x,
				y1: center.y,
				x2: cfg.x,
				y2: cfg.y,
				stroke: cfg.color,
				lineWidth: 5,
				lineCap: 'round',
			},
		});
		group.addShape('circle', {
			attrs: {
				x: center.x,
				y: center.y,
				r: 9.75,
				stroke: cfg.color,
				lineWidth: 4.5,
				fill: '#fff',
			},
		});

		const preAngle = this.preAngle || 0;

		const angle1 = Math.atan((start.y - center.y) / (start.x - center.x));
		const angle = (Math.PI - 2 * (angle1)) * cfg.points[0].x;

		
		if (group.cfg.animable) {
			group.animate((ratio) => {
				group.resetMatrix();
				group.rotateAtPoint(center.x, center.y, preAngle + (angle - preAngle) * ratio);
			}, 300);
		} else {
			group.rotateAtPoint(center.x, center.y, angle);
		}
		this.preAngle = angle;

		return group;
	},
});

registerAnimation('cust-animation', (shape) => {
	console.log('cust-animation', shape)
})

const scale = {
				value: {
					min: 0,
					max: 1,
					tickInterval: 0.1,
					formatter: v => v * 100
				}
	};

const StudyCard = () => {
    const [data, setData] = useState([{ value: 0.56 }]);
	useEffect(() => {
		setTimeout(() => {
			setData([{ value: 0.20 }])
		}, 1000)
	}, [])

    return (
        <NewCard >
            {/* <p>StudyCard</p> */}
            <p 
                // textAlign = "center"
                style = {{ 
                    marginBottom: '-20px',
                    paddingLeft: '14px',
                    height: '16px',
                    lineHeight: '16px' 
                }}>Learning is the eye of the mind.</p>
            <Chart
                height={240}
                data={data}
                scale={scale}
                autoFit
            >
                <Coordinate
                    type="polar"
                    radius={0.75}
                    startAngle={(-12 / 10) * Math.PI}
                    endAngle={(2 / 10) * Math.PI}
                />
                <Axis name="1" />
                <Axis
                    name="value"
                    line={null}
                    label={{
                        offset: -36,
                        style: {
                            fontSize: 18,
                            textAlign: 'center',
                            textBaseline: 'middle',
                        },
                    }}
                    subTickLine={{
                        count: 4,
                        length: -15,
                    }}
                    tickLine={{
                        length: -24,
                    }}
                    grid={null}
                />
                <Point
                    position="value*1"
                    color="#1890FF"
                    shape="pointer"
                    
                />
                <Annotation.Arc
                    start={[0, 1]}
                    end={[1, 1]}
                    style={{
                        stroke: '#CBCBCB',
                        lineWidth: 18,
                        lineDash: null,
                    }}
                />
                <Annotation.Arc
                    start={[0, 1]}
                    end={[data[0].value, 1]}
                    style={{
                        stroke: '#1890FF',
                        lineWidth: 18,
                        lineDash: null,
                    }}
                />
            </Chart>
            <ButtonBox>
                <MyButton href="/study">开始学习</MyButton>
            </ButtonBox>
        </NewCard>
    );
};
// 这个按钮的置底布局可以优化一下，暂时想不出来
const ButtonBox = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
`
const NewCard = styled(Card)`
    color: var(--font-fg);
    border: none;
    position: relative;
    min-width: 300px;
    border-radius: 25px; 
    background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
    box-shadow:  5px 5px 10px var(--card-sd),
                -5px -5px 10px var(--card-sf);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    :hover {
        transform: translateY(-10px);
    }`;

export default StudyCard;