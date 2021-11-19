import React from "react";
import styled from "styled-components";
import { Button, List, Drawer, Popover } from "antd";
import { ListSite, ListItem } from '../../index';
import {  FolderOutlined } from "@ant-design/icons";
// import { recommendSite, documentSite } from '../../assets/recommendData/recommendSite';

const CataDrawer = ({ siteLen, folderArray, handleGoto, cataVisible, onCloseCata }) => {
  const handleClick = (temp) => {
    const index = folderArray.findIndex(item => item.name === temp)
    // index 是数组中的位置 + 未分类网站的数据
    handleGoto(index + siteLen)
  }
  return (
    <Drawer
      width="360px"
      placement="right"
      onClose={onCloseCata}
      visible={cataVisible}
      closable={false}
      drawerStyle={{
        backgroundColor: " var(--card-bg)",
        // boxShadow: " 5px 5px 10px var(--card-sd),- 5px - 5px 10px var(--card-sf)",
        color: "var(--font-fg)",
      }}
    >
      <ListSite
        itemLayout="horizontal"
        dataSource={folderArray}
        size="large"
        bordered={false}
        header={<h2 style={{ textAlign: "center", color: "var(--font-fg)" }}>文件夹目录</h2>}
        renderItem={item => (
          <ListItem>
            <List.Item.Meta
              avatar={<FolderOutlined />}
              title={
                <Popover content={item.name}>
                  <p onClick={() => handleClick(item.name)} style={{ color: "var(--font-fg)", cursor: "pointer" }} >{item?.name?.substr(0, 35)}</p>
                </Popover>
              }
            />
          </ListItem>
        )
        }
      />
    </Drawer >
  );
};

// 无ico时渲染的 字体样式
export const IconFont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background-image: rgb(88, 53, 191);
  font-size: 30px;
`;
// ico图片
export const IconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
  box-shadow: 5px 5px 10px var(--card-sd), -5px -5px 10px var(--card-sf);
  transition: all 0.3s;
  :hover {
    transform: translateY(-5px);
  }
`;
// ico外层盒子
export const IconButton = styled(Button)`
  color: var(--font-fg);
`;
export default CataDrawer;
