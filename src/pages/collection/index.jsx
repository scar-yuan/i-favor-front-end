import React, { useState } from 'react'
import { Upload, message, Button, List, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
export default function Collection() {
    const [favor, setFavor] = useState([])
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkyNmU4ZWM1NmU4NmFkZWM5Y2E4YTkiLCJpYXQiOjE2MzY5OTg5MzYsImV4cCI6MTYzNzAwMjUzNn0.febVRwJet9G75GpjC3H9gXdlrH1OjYgFSOCbOkLtbKI`
    const uploadProps = {
        name: "bookmarkHTML",
        accept: ".html",
        action: '/api/favor',
        headers: {
            Authorization: `Bearer ${token}`
        },
        maxCount: 1,
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: percent => `${parseFloat(percent.toFixed(2))}%`,
        },
        showUploadList: false,
        // 上传文件格式判断
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`文件解析成功`);
                setFavor(info.file.response.data)
            } else if (info.file.status === 'error') {
                message.error(`文件解析失败`);
            }
        },
    }
    const firstFolder = favor[0]?.children;

    return (
        <CollectionContainer>
            <Upload
                {...uploadProps}
            >
                <Button icon={<UploadOutlined />}>导入</Button>
            </Upload>
            <List
                grid={{ gutter: 16, column: 10 }}
                dataSource={firstFolder}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.name}>
                            {
                                item.href
                                    ? <img src={item.href + '/favicon.ico'} alt="" />
                                    : '文件夹'
                            }
                        </Card>
                    </List.Item>
                )}
            />,
        </CollectionContainer >
    )
}

const CollectionContainer = styled(List)`
  color: var(--font-fg);
  border: none;
  border-radius: 10px; 
  background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
  box-shadow:  5px 5px 10px var(--card-sd),
               -5px -5px 10px var(--card-sf);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  /* :hover {
    transform: translateY(-10px);
  } */

`