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
  .show {
    display: inline-block;
  }
  .hidden {
    display: none;
  }
  .notfolder {
    padding: 10px;
    margin: 10px 30px 10px 5px;
    border-radius: 20px;
    box-shadow: 5px 5px 10px #cecece, -5px -5px 10px #fff;
    display: flex;
    align-items: center;
    .site-ico {
      margin-right: 20px;
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
    margin: 10px 30px 10px 5px;
    border-radius: 20px;
    box-shadow: 5px 5px 10px #cecece, -2px -2px 5px #fefefe;
  }
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  .btn {
    cursor: pointer;
    margin: 0 20px 10px 0;
    border: none;
    color: #090909;
    padding: 0.3em 1.1em;
    font-size: 14px;
    border-radius: 0.3em;
    background: #e8e8e8;
    border: 1px solid #e8e8e8;
    transition: all 0.3s;
    box-shadow: 3px 3px 6px #c5c5c5, -3px -3px 6px #ffffff;
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
