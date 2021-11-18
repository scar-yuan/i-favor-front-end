import styled from "styled-components";

const RecentTodoCard = styled.div`
  width: 8vw;
  height: 25vh;
  display: flex;
  padding: 2px 2px;
  flex-direction: column;
  background: #fff;
  box-shadow: 15px 15px 33px #adadad, -15px -15px 33px #ffffff;
  border-radius: 15px;
  margin: auto 1vw auto 1vw;
  .cardDesc {
    height: 5vh;
    text-align: center;
    margin-top: 3.5vh;
    margin-bottom: 3.5vh;
    font-weight: bold;
  }
  .impontentTodo {
    width: 7vw;
    height: 3.5vh;
    align-self: center;
    line-height: 3.5vh;
    border-radius: 5px;
    text-align: center;
    font-size: 1px;
    color: #7d7d7d;
    background: #6c92d0;
  }
`;

export { RecentTodoCard };
