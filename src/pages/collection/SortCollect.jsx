import React, { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import { Container, Draggable } from "react-smooth-dnd";
import { ListWrap } from "./IndexPage.js";
import test from "../../assets/testData/favor.json";

const Collection = () => {
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState({});

  useEffect(() => {
    setData(test.data);
  }, []);

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
    if (depth === 3 || renderData.length === 0) return;
    return (
      <Container
        dragClass="isdrag"
        groupName="col"
        onDrop={(value) => onDrop(value, parent, depth)}
        getChildPayload={(index) => renderData[index]}
        getGhostParent={() => document.body}
      >
        {renderData.map((item) => {
          return (
            <Draggable key={item.name}>
              <div
                className='draggable-item'
                style={depth === 1 ? { marginBottom: "20px" } : {}}
              >
                <div className="draggable-item-content">
                  {item.name}
                </div>
                <div /* className={styles.box} */>
                  {onDomRender(item.children, item, depth + 1)}
                </div>
              </div>
            </Draggable>
          );
        })}
      </Container>
    );
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

  return <ListWrap>{onDomRender(data, null, 1)}</ListWrap>;
};

export default Collection;
