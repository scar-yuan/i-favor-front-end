import styled from "styled-components";

const TodoContainerBox = styled.div`
  background: var(--primary-bg);
  .todoBox {
    width: 30vw;
    height: 75vh;
    margin: 0 auto;
  }
`;

const DivInLi = styled.div`
  width: 24vw;
  height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;

  margin: 0 auto;
  margin-top: 2.5vh;
  font-size: 18px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 12.5px;
  background: #fff;
  box-shadow: 5px 5px 10px #adadad, 5px 5px 10px #ffffff;
`;
const TodoHeader = styled.div`
  width: 24vw;
  height: 8vh;
  margin: 0 auto;
  margin-top: 2.5vh;
  font-size: 18px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 12.5px;
  background: #676565;
  box-shadow: 5px 5px 10px #595757, 5px 5px 10px #757373;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .HeaderDesc {
    margin-left: 1vw;
  }
  .TodoNums {
    width: 3vh;
    height: 3vh;
    background: #c73d3d;
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
