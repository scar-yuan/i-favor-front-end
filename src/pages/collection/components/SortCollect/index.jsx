import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, Drawer } from "antd";
import { nanoid } from "nanoid";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { cloneDeep } from "lodash";
import { Container, Draggable } from "react-smooth-dnd";
import NewForm from "../form/Form";
import {
  ListWrap,
  ContentWrap,
  DraggableItemWrap,
  TitleWrap,
} from "./IndexPage.js";
// import test from "../../../../assets/testData/favor.json";

const SortCollect = (props) => {
  const [isNewFolderVisible, setIsNewFolderVisible] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [isNewSiteVisible, setIsNewSiteVisible] = useState(false);
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState({});
  const folderForm = useRef(null);
  const siteForm = useRef(null);
  useEffect(() => {
    console.log(props.favor);
    setData(props.favor);
  }, []);

  // 模态框
  const showNewFolderVisible = () => {
    setIsNewFolderVisible(true);
  };
  const showNewSiteVisible = () => {
    setIsNewSiteVisible(true);
  };

  const handleNewFolderVisibleOk = () => {
    folderForm.current.validateFields().then((values) => {
      console.log(values);
      setData([
        {
          ...values,
          nanoid: nanoid(),
          type: "folder",
          icon: "",
          children: [],
        },
        ...data,
      ]);
    });
    setTimeout(() => {
      folderForm.current.resetFields();
    }, 0);
    setIsNewFolderVisible(false);
    
  };

  const handleNewSiteVisibleOk = () => {
    siteForm.current.validateFields().then((values) => {
      setData([
        {
          ...values,
          nanoid: nanoid(),
          type: "site",
          icon: `${values.href}/favicon.ico`,
          children: [],
        },
        ...data,
      ]);
    });
    setTimeout(() => {
      siteForm.current.resetFields();
    }, 0);
    setIsNewSiteVisible(false);
    
  };

  const handleNewFolderVisibleCancel = () => {
    setIsNewFolderVisible(false);
  };
  const handleNewSiteVisibleCancel = () => {
    setIsNewSiteVisible(false);
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
      }else if (addedDepth === 3) {
        const tempData = onDrag(addedParent.children, {
          ...current,
          removedIndex: null,
        });
        const index = onGetIndex(addedParent, result, []);
        result[index[0]].children[index[1]].children = tempData;
      }
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
      }else if (removedDepth === 3) {
        const index = onGetIndex(removedParent, result, []);
        const parent = result[index[0]].children[index[1]];
        const tempData = onDrag(parent.children, {
          ...current,
          addedIndex: null,
        });
        result[index[0]].children[index[1]].children = tempData;
      }

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
        }else if (depth === 3) {
          const tempData = onDrag(parent.children, dropResult);
          const index = onGetIndex(parent, result, []);
          result[index[0]].children[index[1]].children = tempData;
        }
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
    if (depth === 4 || (parent && parent.type === "site")) {
      return;
    }
    return (
      <Container
        groupName="col"
        onDrop={(value) => onDrop(value, parent, depth)}
        getChildPayload={(index) => renderData[index]}
        getGhostParent={() => document.body}
      >
        {renderData&&renderData.map((item) => {
          return (
            <Draggable key={item.nanoid}>
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
                      <div
                        className={isShowDelete ? "show" : "hidden"}
                        onClick={() => {
                          handleSingleDelete(item.nanoid);
                        }}
                      >
                        <CloseCircleTwoTone twoToneColor="red" />
                      </div>
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
  // 删除按钮
  const handleDelete = useCallback(() => {
    setIsShowDelete(!isShowDelete);
  }, [isShowDelete]);
  // 具体删哪个
  const handleSingleDelete = (id) => {
    console.log(id);
    function getFilterArr(arr, tar) {
      return arr.filter(function(item, i) {
          if (item.children) {
              item.children = getFilterArr(item.children, tar)
          }
          return item.nanoid !== tar;
      })
  }
  const filterData = getFilterArr(data,id);
  setData(filterData);
  };
  const handleSave = () => {
    console.log(data);
    setIsShowDelete(false);
  };
  // 新建文件夹
  const handleNewFolder = () => {
    showNewFolderVisible();
  };
  const handleNewSite = () => {
    showNewSiteVisible();
  };
 /*  useEffect(() => {
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
    // console.log(test.data);
    // console.log(list);
    const res = flatten(test.data);
    // console.log(res);
    // setFlatData(res);
    // console.log('data',data);
    // console.log('temp',temp);
  }, []); */
  return (
    <>
      <Drawer
        title="收藏夹管理"
        placement="left"
        onClose={() => {
          props.onCloseSort();
        }}
        visible={props.sortVisible}
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
          <div
            className="btn"
            onClick={() => {
              handleNewSite();
            }}
          >
            加入文件
          </div>
          <div
            className="btn"
            onClick={() => {
              handleDelete();
            }}
          >
            删除文件
          </div>
          <div
            className="btn"
            onClick={() => {
              handleSave();
            }}
          >
            保存
          </div>
        </TitleWrap>
        {/* 新建文件夹模态框 */}
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
        {/* 新建文件模态框 */}
        <Modal
          title="新建文件夹"
          visible={isNewSiteVisible}
          okText="确认"
          cancelText="取消"
          onOk={handleNewSiteVisibleOk}
          onCancel={handleNewSiteVisibleCancel}
        >
          <NewForm ref={siteForm} type="site"></NewForm>
        </Modal>
        <ListWrap>{onDomRender(data, null, 1)}</ListWrap>
      </Drawer>
    </>
  );
};

export default SortCollect;
