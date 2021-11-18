import styled from "styled-components";

const TodoLayoutBox = styled.div`
  display: flex;
  justify-content: space-between;
  background: var(--primary-bg);
  .leftTodoBox {
    height: 100vh;
    width: 36vw;
    flex-grow: 1;
  }
  .rightTodoBox {
    height: 100vh;
    width: 36vw;
    flex-grow: 1;
  }
  .centerTodoBox {
    height: 100vh;
    width: 26vw;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const TodoInput = styled.input`
  width: 30vw;
  height: 5vh;
  border-radius: 25px;
  background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
  box-shadow: 5px 5px 10px var(--card-sd), -5px -5px 10px var(--card-sf);
`;
const BackButton = styled.button`
  display: flex;
  height: 2.5em;
  width: 80px;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee4b;
  border-radius: 3px;
  letter-spacing: 1px;
  transition: all 0.2s linear;
  cursor: pointer;
  border: none;
  background: #fff;
  > svg {
    margin-right: 5px;
    margin-left: 5px;
    font-size: 20px;
    transition: all 0.4s ease-in;
  }
  :hover > svg {
    font-size: 1.2em;
    transform: translateX(-5px);
  }
  :hover {
    box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
    transform: translateY(-2px);
  }
`;

export { TodoLayoutBox, TodoInput, BackButton };
