import styled from "styled-components";

const TodoContainerBox = styled.div`
  background: var(--primary-bg);
  .todoBox {
    width: 30vw;
    height: 75vh;
    margin: 0 auto;
    padding: 0 auto;
  }
`;

const DivInLi = styled.div`
  width: 24vw;
  height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: var(--font-fg);
  margin: 0 auto;
  margin-top: 2.5vh;
  font-size: 18px;

  border: none;
  border-radius: 12.5px;
  user-select: none;
  background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
  box-shadow: 5px 5px 10px var(--card-sd), -5px -5px 10px var(--card-sf);
`;
const TodoHeader = styled.div`
  width: 24vw;
  height: 8vh;
  margin: 0 auto;
  margin-top: 2.5vh;
  font-size: 18px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 12.5px;
  color: var(--font-fg);
  background: var(--todoheader-bg);
  box-shadow: 5px 5px 10px var(--todoheader-sd),
    -5px -5px 10px var(--todoheader-sf);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .HeaderDesc {
    margin-left: 1vw;
  }
  .TodoNums {
    width: 3vh;
    height: 3vh;
    background: var(--todo-header-font-fg);
    color: var(--font-fg);
    margin-right: 1vw;
    border-radius: 15px;
    text-align: center;
  }
`;
const Radio = styled.input`
  width: 20px;
  height: 20px;
  appearance: none;
  position: relative;
  margin-left: 1vw;
  :before {
    content: "";
    width: 20px;
    height: 20px;
    border: 1px solid green;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
  }
  :checked:before {
    content: "";
    width: 20px;
    height: 20px;
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
    top: 6px;
    left: 5px;
    vertical-align: middle;
    transform: rotate(-45deg);
  }
`;

export { DivInLi, TodoContainerBox, TodoHeader, Radio };
