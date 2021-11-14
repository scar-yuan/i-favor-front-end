import React from 'react';
import { Card } from 'antd';
import styled from "styled-components";
import MyButton from '../Button/index'
const CollectionCard = () => {
  return (
    <NewCard>
      <p>CollectionCard</p>
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
  position: relative;
  flex: 1;
  margin: 0px 100px;
  border-radius: 25px; 
  background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
  box-shadow:  20px 20px 40px var(--card-sd),
               -20px -20px 40px var(--card-sf);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  :hover {
    transform: translateY(-10px);
  }
`
export default CollectionCard;