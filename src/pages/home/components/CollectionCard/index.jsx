import React from 'react';
import { Card, List, Button, Carousel } from 'antd';
import styled from "styled-components";
import MyButton from '../Button/index'
const CollectionCard = ({ searchData }) => {
  console.log(searchData);
  let data = searchData || []
  const Count = 10
  // 对齐数据
  // while (searchData?.length !== undefined && data.length % Count !== 0) {
  //   data.push({});
  // }
  // 切割数据源
  const sliceItems = [];
  if (searchData?.length !== undefined) {
    for (let i = 0; i < data.length; i += Count) {
      let endIndex = i + Count < data.length ? i + Count : data.length;
      sliceItems.push(data.slice(i, endIndex));
    }
    console.log(sliceItems);
  }
  const items = [];
  for (let i = 0; i < sliceItems.length; i++) {
    items.push(<div><List
      itemLayout="horizontal"
      dataSource={sliceItems[i]}
      renderItem={item => (
        <Button type="link" href={item.href} target="_blank">
          <IconDiv>
            {/* <img style={{ width: "48px", height: "48px" }} src={item.href + 'favicon.ico'} alt={item.name} /> */}
            <IconFont>
              <span>{item.name.trim().substr(0, 1)}</span>
            </IconFont>
            <img
              style={{ width: "48px", height: "48px", position: "absolute", backgroundColor: "var(--primary-bg)" }}
              src={item.href + '/favicon.ico'}
              alt={item.name}
              onError={(e) => { e.target.onerror = null; e.target.style = "display: none" }}
            />
          </IconDiv>
          <p style={{ fontSize: "12px", color: "var(--font-fg)", width: "56px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
        </Button>
      )}
    /></div>)
  }
  return (
    <NewCard>
      <Carousel style={{ margin: "20px 0px", padding: "10px 0" }} autoplay dotPosition={"bottom"} dots={false}>
        {items}
      </Carousel>
      <ButtonBox>
        <MyButton href="/collection">收藏夹管理</MyButton>
      </ButtonBox>
    </NewCard>
  );
};

const ButtonBox = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
`
const NewCard = styled(Card)`
  min-width: 500px;
  height: 350px;
  color: var(--font-fg);
  border: none;
  position: relative;
  flex: 1;
  margin: 0px 100px;
  border-radius: 25px; 
  background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
  box-shadow:  5px 5px 10px var(--card-sd),
               -5px -5px 10px var(--card-sf);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  :hover {
    transform: translateY(-10px);
  }
`
const SearchList = styled(List)`
  height: 250px;
  overflow:hidden;
`
// 无ico时渲染的 字体样式
const IconFont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    background-image: rgb(88, 53, 191);
    font-size: 30px;
`
// ico图片
const IconDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border-radius: 10px; 
    /* background-color: red; */
    background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
    box-shadow:  5px 5px 10px var(--card-sd),
               -5px -5px 10px var(--card-sf);
    transition: all .3s;
    :hover {
        transform: translateY(-5px);
    }
`
export default CollectionCard;