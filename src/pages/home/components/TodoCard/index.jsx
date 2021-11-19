import React from 'react';
import { Card } from 'antd';
import styled from "styled-components";
import MyButton from '../Button';
const TodoCard = () => {
    return (
        <NewCard>
            <TodoDiv>
              <div className="header">Todo</div>
              <div className="todo"><MinRadio readOnly checked type="radio"/><div className="todoContent">写下待办</div><div className="timeDesc">04:30</div></div>
              <div className="todo"><MinRadio readOnly checked type="radio"/><div className="todoContent">逐个完成</div><div className="timeDesc">05:30</div></div>
              <div className="todo"><MinRadio readOnly checked type="radio"/><div className="todoContent">调整状态</div><div className="timeDesc">06:30</div></div>
              <div className="todo"><MinRadio readOnly checked type="radio"/><div className="todoContent">潇洒离去</div><div className="timeDesc">07:30</div></div>
            </TodoDiv>
            <ButtonBox>
            <MyButton href="/todolist" >待办清单</MyButton>
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
  color: var(--font-fg);
  border: none;
  position: relative;
  min-width: 300px;
  height: 350px;
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
const TodoDiv = styled.div`
width:100%;
dispaly:flex;
flex-direction:column;
justify-content:center;
.todo{
  height:5vh;
  line-height:5vh;
  text-align:center;
  display:flex;
  justify-content:space-around;
  margin-top:2vh;
  border-radius: 8px;
  background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
  box-shadow: 5px 5px 10px var(--card-sd),
             -5px -5px 10px var(--card-sf);
      .todoContent{
        width:80%;
      }
      .timeDesc{
        margin-right:1vw;
        color:gray;
        opacity:0.8;
      }
}
.header{
  height:5vh;
  line-height:5vh;
  margin-top:1vh;
  text-align:center;
  border-radius: 8px;
  background: var(--todoheader-bg);
  box-shadow:  5px 5px 10px var(--todoheader-sd),
               -5px -5px 10px var(--todoheader-sf);
}

`
const MinRadio = styled.input`
  width: 15px;
  height: 15px;
  appearance: none;
  position: relative;
  margin-left: 1vw;
  :before {
    content: "";
    width: 15px;
    height: 15px;
    border: 1px solid green;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
  }
  :checked:before {
    content: "";
    width: 15px;
    height: 15px;
    border: 1px solid green;
    background: green;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
  }
  :checked:after {
    content: "";
    width: 10px;
    height: 5px;
    border: 2px solid white;
    border-top: transparent;
    border-right: transparent;
    text-align: center;
    display: block;
    position: absolute;
    top: 13px;
    left: 3px;
    vertical-align: middle;
    transform: rotate(-45deg);
  }
`
export default TodoCard;