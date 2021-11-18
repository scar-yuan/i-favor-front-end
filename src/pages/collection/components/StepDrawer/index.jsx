import React, { useState } from 'react';
import { Drawer, Steps } from 'antd';
const { Step } = Steps
const StepDrawer = ({ onCloseStep, stepVisible }) => {
    const [current, setCurrent] = useState(0)
    const onChangeStep = current => {
        setCurrent(current)
    };
    return (
        <Drawer
            placement="top"
            onClose={onCloseStep}
            visible={stepVisible}
            height="140px"
        >
            <Steps
                current={current}
                onChange={onChangeStep}
                size="large"
                style={{userSelect:'none'}}
            >
                <Step title="Step 1" description="打开浏览器书签管理器" />
                <Step title="Step 2" description="右上角导出书签" />
                <Step title="Step 3" description="点击本页面中导入收藏夹，选择刚刚导出的html文件" />
            </Steps>
        </Drawer>
    );
};

export default StepDrawer;