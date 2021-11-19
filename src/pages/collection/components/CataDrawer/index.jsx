import React from "react";
import styled from "styled-components";
import { Button, List, Drawer,Popover } from "antd";
import { ListSite, ListItem } from '../../index';
import { GlobalOutlined, HighlightOutlined,FolderOutlined } from "@ant-design/icons";
import logo from '../../../../assets/logo/logo192.png'
// import { recommendSite, documentSite } from '../../assets/recommendData/recommendSite';

const RightDrawer = ({ cataVisible, onCloseCata, favor, isTemp }) => {
  const localData = isTemp ? "" : favor;
  const folderArray = localData!=="" ? localData.filter((item) => item.type === "folder"):[];
  folderArray.forEach((item) => {
    let len = folderArray.length - 1;
    item.children.forEach((sand) => {
      sand.type === "folder" && folderArray.push(sand);
    });
    folderArray.splice(len, 1);
  });
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
                                    <a style={{ color: "var(--font-fg)" }} href={item.name}>{item.name.substr(0, 35)}</a>
                                </Popover>
                            }
                        />
                    </ListItem>
                )}
            />
    </Drawer>
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
export default RightDrawer;
