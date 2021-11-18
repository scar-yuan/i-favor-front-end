import React, { useState, useEffect,useRef } from "react";
import { Drawer, Button, Radio, Space,Modal } from "antd"; // 测试
// import {CloseCircleTwoTone} from '@ant-design/icons';
import { cloneDeep } from "lodash";
import { Container, Draggable } from "react-smooth-dnd";
import NewForm from './components/form/Form'
import {
  ListWrap,
  ContentWrap,
  DraggableItemWrap,
  TitleWrap,
} from "./IndexPage.js";
import test from "../../assets/testData/favor.json";

const SortCollect = () => {
  const [visible, setVisible] = useState(false);
  const [isNewFolderVisible, setIsNewFolderVisible] = useState(false);
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState({});
  const folderForm = useRef(null);
  useEffect(() => {
    setData(test.data);
  }, []);
  // 测试
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  // 模态框
  const showNewFolderVisible = () => {
    setIsNewFolderVisible(true);
  };

  const handleNewFolderVisibleOk = () => {
    folderForm.current.validateFields().then((values)=>{
      setData([{
        ...values,
        type:"folder",
        icon:"",
        children:[]
      },...data])
    })
    // console.log(data);
    setIsNewFolderVisible(false);
  };

  const handleNewFolderVisibleCancel = () => {
    setIsNewFolderVisible(false);
  };

  const onDrag = (arr = [], dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) {
      return arr;
    }
    const result = [...arr];
    let itemToAdd = payload;
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }
    return result;
  };

  const onGetIndex = (item, tempData, indexArr, lastIndex) => {
    tempData.length > 0 &&
      tempData.forEach((ele, index) => {
        if (item.name === ele.name) {
          if (lastIndex !== undefined) {
            indexArr.push(lastIndex);
            indexArr.push(index);
          } else {
            indexArr.push(index);
          }
        } else if (ele.children.length && ele.children.length > 0) {
          onGetIndex(item, ele.children, indexArr, index);
        }
      });
    return indexArr;
  };

  const onTreate = (current) => {
    const {
      removedIndex,
      addedIndex,
      removedDepth,
      addedDepth,
      removedParent,
      addedParent,
    } = current;
    if (
      removedIndex !== null &&
      addedIndex !== null &&
      removedIndex !== undefined &&
      addedIndex !== undefined
    ) {
      let result = cloneDeep(data);
      if (addedDepth === 1) {
        result = onDrag(result, { ...current, removedIndex: null });
      } else if (addedDepth === 2) {
        const tempData = onDrag(addedParent.children, {
          ...current,
          removedIndex: null,
        });
        const index = onGetIndex(addedParent, result, []);
        result[index[0]].children = tempData;
      }
      // else if (addedDepth === 3) {
      //   const tempData = onDrag(addedParent.children, {
      //     ...current,
      //     removedIndex: null,
      //   });
      //   const index = onGetIndex(addedParent, result, []);
      //   result[index[0]].children[index[1]].children = tempData;
      // }
      if (removedDepth === 1) {
        result = onDrag(result, { ...current, addedIndex: null });
      } else if (removedDepth === 2) {
        const index = onGetIndex(removedParent, result, []);
        const parent = result[index[0]];
        const tempData = onDrag(parent.children, {
          ...current,
          addedIndex: null,
        });
        result[index[0]].children = tempData;
      }
      // else if (removedDepth === 3) {
      //   const index = onGetIndex(removedParent, result, []);
      //   const parent = result[index[0]].children[index[1]];
      //   const tempData = onDrag(parent.children, {
      //     ...current,
      //     addedIndex: null,
      //   });
      //   result[index[0]].children[index[1]].children = tempData;
      // }

      setData(result);
      setTemp({});
    }
  };

  const onDrop = (dropResult, parent, depth) => {
    const { removedIndex, addedIndex, payload } = dropResult;
    if (removedIndex !== null || addedIndex !== null) {
      if (removedIndex !== null && addedIndex !== null) {
        let result = cloneDeep(data);
        if (depth === 1) {
          result = onDrag(data, dropResult);
        } else if (depth === 2) {
          const tempData = onDrag(parent.children, dropResult);
          const index = onGetIndex(parent, result, []);
          result[index[0]].children = tempData;
        }
        // else if (depth === 3) {
        //   const tempData = onDrag(parent.children, dropResult);
        //   const index = onGetIndex(parent, result, []);
        //   result[index[0]].children[index[1]].children = tempData;
        // }
        setData(result);
      } else if (
        temp.removedIndex === undefined &&
        temp.addedIndex === undefined
      ) {
        let flag =
          addedIndex !== null
            ? { addedDepth: depth, addedParent: parent }
            : { removedDepth: depth, removedParent: parent };
        setTemp({ ...dropResult, ...flag });
      } else if (
        temp.addedIndex !== null &&
        temp.removedIndex === null &&
        temp.payload.name === payload.name
      ) {
        const current = {
          ...temp,
          removedIndex,
          removedDepth: depth,
          removedParent: parent,
        };
        onTreate(current);
      } else if (
        temp.removedIndex !== null &&
        temp.addedIndex === null &&
        temp.payload.name === payload.name
      ) {
        const current = {
          ...temp,
          addedIndex,
          addedDepth: depth,
          addedParent: parent,
        };
        onTreate(current);
      }
    }
  };

  // 利用递归实现列表的渲染
  const onDomRender = (renderData, parent, depth) => {
    // console.log(renderData);
    if (depth === 3 || (parent && parent.type === "site")) {
      return;
    }
    return (
      <Container
        groupName="col"
        onDrop={(value) => onDrop(value, parent, depth)}
        getChildPayload={(index) => renderData[index]}
        getGhostParent={() => document.body}
      >
        {renderData.map((item) => {
          return (
            <Draggable key={item.name}>
              <DraggableItemWrap>
                <div
                  className={item.type === "folder" ? "draggable-item" : ""}
                  style={depth === 1 ? { marginBottom: "10px" } : {}}
                >
                  <ContentWrap>
                    <div
                      className={
                        item.type === "folder" ? "isfolder" : "notfolder"
                      }
                    >
                      {item.type === "site" ? (
                        <img
                          className="site-ico"
                          src={"https://www.jianshu.com/favicon.ico"}
                          alt=""
                        />
                      ) : null}
                      <p>{item.name}</p>
                      {/* <div>
                        <CloseCircleTwoTone twoToneColor="red"/>
                      </div> */}
                    </div>
                  </ContentWrap>
                  <div className="draggable-box">
                    {onDomRender(item.children, item, depth + 1)}
                  </div>
                </div>
              </DraggableItemWrap>
            </Draggable>
          );
        })}
      </Container>
    );
  };

  // 新建文件夹
  const handleNewFolder = () => {
    showNewFolderVisible();
  };

  useEffect(() => {
    function flatten(array, result) {
      result = result || [];
      array.forEach((element) => {
        if (element.children.length !== 0) {
          result.push(element);
          flatten(element.children, result);
        } else {
          result.push(element);
        }
      });
      return result;
    }
    console.log(test.data);
    // console.log(list);
    // const res = flatten(test.data);
    // console.log(res);
    // console.log('data',data);
    // console.log('temp',temp);
  }, []);

  return (
    <>
      {/* 测试 */}
      <Button
        type="primary"
        onClick={() => {
          showDrawer();
        }}
      >
        Primary Button
      </Button>
      <Drawer
        title="收藏夹管理"
        placement="left"
        closable={false}
        onClose={() => {
          onClose();
        }}
        visible={visible}
        size="large"
        key="left"
        drawerStyle={{ backgroundColor: "rgb(233,233,233)" }}
      >
        <TitleWrap>
          <div
            className="btn"
            onClick={() => {
              handleNewFolder();
            }}
          >
            新建文件夹
          </div>
          <div className="btn">加入文件</div>
          <div className="btn">删除文件</div>
          <h6>*先点击删除按钮,再进行删除哦 </h6>
        </TitleWrap>
        <Modal
          title="新建文件夹"
          visible={isNewFolderVisible}
          okText="确认"
          cancelText="取消"
          onOk={handleNewFolderVisibleOk}
          onCancel={handleNewFolderVisibleCancel}
        >
         <NewForm ref={folderForm} type="folder"></NewForm>
        </Modal>
        <ListWrap>{onDomRender(data, null, 1)}</ListWrap>
      </Drawer>
    </>
  );
};

export default SortCollect;
