import React from 'react';
import { List, Drawer, Avatar, Popover } from 'antd';
import { ListSite, ListItem } from '../../index';

const MyFavorList = ({ favor, leftVisible, onCloseLeft }) => {
    return (
        <Drawer
            width="350px"
            placement="right"
            onClose={onCloseLeft}
            visible={leftVisible}
            closable={false}
            bodyStyle={{
                padding: "0px"
            }}
            drawerStyle={{
                backgroundColor: " var(--card-bg)",
                // boxShadow: " 5px 5px 10px var(--card-sd),- 5px - 5px 10px var(--card-sf)",
                color: "var(--font-fg)"
            }}
        >
            <ListSite
                itemLayout="horizontal"
                dataSource={favor}
                size="large"
                bordered={false}
                header={<h2 style={{ textAlign: "center", color: "var(--font-fg)" }}>收藏的网站列表</h2>}
                renderItem={item => (
                    <ListItem>
                        <List.Item.Meta
                            avatar={<Avatar src={item.icon} />}
                            title={
                                <Popover content={item.name}>
                                    <a style={{ color: "var(--font-fg)" }} href={item.href}>{item.name.substr(0, 35)}</a>
                                </Popover>
                            }
                        />
                    </ListItem>
                )}
            />
        </Drawer>
    );
};


export default MyFavorList;