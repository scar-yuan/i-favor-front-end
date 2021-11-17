import styled from "styled-components";

const ListWrap = styled.div`
  height: 600px;
  width: 800px;
  margin: 50px auto;
  background-color: var(--primary-bg);
  overflow-y: auto;
  border-radius: 40px;
  box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
  /* .smooth-dnd-draggable-wrapper{
        border-radius: 20px;
    } */
  .isdrag {
    background-color: #000;
    border-radius: 20px;
    box-shadow: 5px 5px 10px #cecece, -5px -5px 10px #fff;
  }
  .draggable-item {
    padding: 10px;
    margin: 20px;
    border-radius: 20px;
    box-shadow: 5px 5px 10px #cecece, -5px -5px 10px #fff;
    .draggable-item-content {
    }
  }
`;

export { ListWrap };
