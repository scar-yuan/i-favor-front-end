import styled from "styled-components";

const ListWrap = styled.div`
  box-sizing: border-box;
  width: 710px;
  background-color: var(--primary-bg);
  /* border-radius: 40px;
  box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff; */
  /* .smooth-dnd-draggable-wrapper{
        border-radius: 20px;
    } */
    /* .smooth-dnd-container {
  
    } */
    
  
    /* 二级列表样式 */
    .draggable-box{
     
    }
  }
  .draggable-item-content {
      
     
    }
`;

const ContentWrap = styled.div`
  cursor: grab;
  user-select: none;
  .show {
    display: inline-block;
  }
  .hidden {
    display: none;
  }
  .notfolder {
    padding: 10px;
    margin: 10px 10px 10px 5px;
    border-radius: 20px;
    box-shadow: 5px 5px 10px var(--card-sd), -5px -5px 10px var(--card-sf);
    display: flex;
    align-items: center;
    color: var(--font-fg);
    .site-ico {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 85%;
    }
  }
  .isfolder {
    display: flex;
    justify-content: space-between;
  }
`;
const DraggableItemWrap = styled.div`
  .draggable-item {
    padding: 10px;
    margin: 10px 10px 10px 5px;
    border-radius: 20px;
    color: var(--font-fg);
    box-shadow: 5px 5px 10px var(--card-sd), -2px -2px 5px var(--card-sf);
  }
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  .btn {
    cursor: pointer;
    margin: 0 20px 10px 0;
    border: none;
    color: var(--font-fg);
    padding: 0.3em 1.1em;
    font-size: 14px;
    border-radius: 0.3em;
    background: var(--primary-bg);
    border: 1px solid var(--primary-bg);
    transition: all 0.3s;
    box-shadow: 3px 3px 6px var(--card-sd), -3px -3px 6px var(--card-sf);
    &:hover {
      border: 1px solid white;
    }
    &:active {
      box-shadow: 4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff;
    }
  }
  h6 {
    margin-top: 25px;
  }
`;

export { ListWrap, ContentWrap, DraggableItemWrap, TitleWrap };
