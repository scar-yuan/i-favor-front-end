import Reactm,{useRef} from "react";
import styled from "styled-components";
import { List, Carousel, Button } from "antd";
import { flatten } from "../../../../utils/flatten";
import { LeftCircleTwoTone, RightCircleTwoTone } from "@ant-design/icons";
import { IconButton, IconDiv, IconFont } from "../RightDrawer";
import {
  recommendSite,
  documentSite,
} from "../../../../assets/recommendData/recommendSite";
const CenterShow = ({ isTemp, favor }) => {

  const calRef = useRef(null);
  // 40 个一页
  const Count = 40;
  // JSON.parse(localStorage.getItem('originalFavor'))
  const localData = isTemp ? documentSite : favor;
  // 第一层是书签栏层，可以有很多个书签栏，书签栏下有收藏夹，收藏夹下有网站

  const siteArray = localData?.filter((item) => item.type === "site");
  const folderArray = localData?.filter((item) => item.type === "folder"); // 获取到第一层中有多少个文件夹
  // 遍历每个书签栏下的 文件夹，再分类，同时需要注意将遍历过的书签栏从数组中清除
  folderArray.forEach((item) => {
    let len = folderArray.length - 1;
    item.children.forEach((sand) => {
      sand.type === "site" && siteArray.push(sand);
      sand.type === "folder" && folderArray.push(sand);
    });
    folderArray.splice(len, 1);
  });
  const sliceSiteItems = [];
  if (siteArray?.length !== undefined) {
    for (let i = 0; i < siteArray.length; i += Count) {
      let endIndex =
        i + Count < siteArray.length ? i + Count : siteArray.length;
      sliceSiteItems.push(siteArray.slice(i, endIndex));
    }
  }
  // 当site数据过多时，分页展示
  const sites = [];
  for (let i = 0; i < sliceSiteItems.length; i++) {
    sites.push(
      <div style={{ height: "90vh" }}>
        <Title>未分类网站</Title>
        <List
          style={{ margin: "50px 0 0 0", height: "90vh" }}
          grid={{
            gutter: 16,
            xs: 2,
            sm: 3,
            md: 4,
            lg: 6,
            xl: 8,
            xxl: 10,
          }}
          dataSource={sliceSiteItems[i]}
          renderItem={(item) => (
            <List.Item key={item.nanoid}>
              <IconButton type="link" href={item.href} target="_blank">
                <IconDiv style={{ width: "80px", height: "80px" }}>
                  <IconFont style={{ fontSize: "36px", fontWeight: "bold" }}>
                    <span>{item.name.trim().substr(0, 1)}</span>
                  </IconFont>
                  <img
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      position: "absolute",
                      backgroundColor: "#fff",
                    }}
                    src={item.icon}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style = "display: none";
                    }}
                  />
                </IconDiv>
                <p
                  style={{
                    fontSize: "12px",
                    width: "80px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </p>
              </IconButton>
            </List.Item>
          )}
        />
      </div>
    );
  }

  const folders = [];
  const flatFolder = [];
  // 扁平化对应的文件夹
  if (folderArray?.length !== undefined) {
    for (let i = 0; i < folderArray.length; i++) {
      flatFolder.push(flatten([folderArray[i]]));
      // 如果某个数组超过 40 个分页
      let len = flatFolder[i].length;
      if (len > 40) {
        for (let j = 0; j < len; j += 40) {
          let endIndex = j + 40 < len ? j + 40 : len;
          flatFolder.push(flatFolder[i].slice(j, endIndex));
        }
        flatFolder.splice(i, 1);
      }
    }
    console.log(flatFolder);
  }
  for (let i = 0; i < flatFolder.length; i++) {
    folders.push(
      <div style={{ height: "90vh" }}>
        <Title>{flatFolder[i][0].name}</Title>
        <List
          style={{ margin: "50px 0 0 0", height: "90vh" }}
          grid={{
            gutter: 16,
            xs: 2,
            sm: 3,
            md: 4,
            lg: 6,
            xl: 8,
            xxl: 10,
          }}
          dataSource={flatFolder[i]}
          renderItem={(item) => (
            <List.Item>
              <IconButton type="link" href={item.href} target="_blank">
                <IconDiv style={{ width: "80px", height: "80px" }}>
                  <IconFont style={{ fontSize: "36px", fontWeight: "bold" }}>
                    <span>{item.name.trim().substr(0, 1)}</span>
                  </IconFont>
                  <img
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      position: "absolute",
                      backgroundColor: "#fff",
                    }}
                    src={item.icon}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style = "display: none";
                    }}
                  />
                </IconDiv>
                <p
                  style={{
                    fontSize: "12px",
                    width: "80px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </p>
              </IconButton>
            </List.Item>
          )}
        />
      </div>
    );
  }
  const handleGotoNext = ()=>{
    calRef.current.next()
  }
  const handleGotoPrev = ()=>{
    calRef.current.prev()
  }
  return (
    <div style={{position:"relative"}}>
      <Larrow onClick={()=>{handleGotoPrev()}}><LeftCircleTwoTone twoToneColor="var(--card-bg)"  style={{fontSize:"50px"}}/></Larrow>
      <Rarrow onClick={()=>{handleGotoNext()}}><RightCircleTwoTone twoToneColor="var(--card-bg)" style={{fontSize:"50px"}}/></Rarrow>
      <CenterContainer
        ref={calRef}
        dotsClass={"slick-dots"}
        draggable={true}
        adaptiveHeight={true}
        autoplay
        infinite
        dotPosition={"bottom"}
        dots={true}
      >
        {sites}
        {folders}
      </CenterContainer>
    </div>
  );
};
const Title = styled(Button)`
  /* font-size: 20px; */
  position: fixed;
  /* top: -10px; */
  margin: 5px 10px;
  font-size: 20px;
  height: 40px;
  padding: 5px;
  color: var(--font-fg);
  border: none;
  border-radius: 10px;
  background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
  box-shadow: 5px 5px 10px var(--card-sd), -5px -5px 10px var(--card-sf);
`;
// 首页主拖拽区
const CenterContainer = styled(Carousel)`
  padding: 0px 100px;
  /* margin: 50px 0px; */
  width: 95vw;
  height: 100vh;
  .slick-dots {
      height: 6px;
      li{
          width: 50px !important;
          button{
          width: 30px !important;
          height: 6px !important;
          background-color: var(--primary-fg) !important;
      }
      }
      
      
  }
`;
const Larrow = styled.div`
  position: absolute;
  top:50%;
  left:55px;
  transform: translate(-50%,-50%);
  padding: 5px;
  cursor: pointer;
  user-select: none;
  z-index: 99;
  opacity: .5;
  &:hover{
    background-color: rgba(255,255,255,.3);
  }
`;
const Rarrow = styled.div`
  position: absolute;
  top:50%;
  right:40px;
  transform: translate(-50%,-50%);
  cursor: pointer;
  padding: 5px;
  user-select: none;
  z-index: 99;
  opacity: .5;
  &:hover{
    background-color: rgba(255,255,255,.3);
  }
`

export default CenterShow;
