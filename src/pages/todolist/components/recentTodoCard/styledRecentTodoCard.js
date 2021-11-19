import styled from "styled-components";

const RecentTodoCard = styled.div`
  width: 8vw;
  height: 25vh;
  display: flex;
  padding: 2px 2px;
  flex-direction: column;
  background: var(--todoli-bg);
  box-shadow: 15px 15px 33px var(--todoli-sd),
    -15px -15px 33px var(--todocard-sd);
  border-radius: 15px;
  margin: auto 1vw auto 1vw;
  .cardDesc {
    height: 5vh;
    text-align: center;
    margin-top: 3.5vh;
    margin-bottom: 3.5vh;
    font-weight: bold;
    color: var(--font-fg);
  }
  .impontentTodo {
    width: 7vw;
    height: 3.5vh;
    align-self: center;
    line-height: 3.5vh;
    border-radius: 5px;
    text-align: center;
    font-size: 1px;
    color: #000;
    background: #6c92d0;
  }
`;

export { RecentTodoCard };
