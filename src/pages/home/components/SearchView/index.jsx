import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons'
import { message } from 'antd';
// 自带网站
import { recommendSite } from '../../../../assets/recommendData/recommendSite';
import { useDebounce } from '../../../../utils/useDebounce';
const SearchView = ({ setSearchData }) => {
    const jsonData = JSON.parse(localStorage.getItem('flatFavor'))
    const favorData = jsonData || recommendSite
    // 初始化加载界面数据，原则：用户有就用用户的，没有就用推荐的
    useEffect(() => {
        setSearchData(favorData)
    }, [])
    const [isTip, setIsTip] = useState(false) // 判断提示框是否展示过
    const onChange = (e) => {
        let key = e.target.value;
        // 通过正则过滤数据
        if (favorData.length !== 0) {
            let findResult = favorData.filter(function (item) {
                //遍历数组，返回值为true保留并复制到新数组，false则过滤掉
                let inputValue = new RegExp(`(.*)(${key.split('').join(')(.*)(')})(.*)`, 'i');
                return item.name.match(inputValue);
            });
            setSearchData(findResult)
        }
        // 本地没有数据时提示用户
        if (jsonData === null && !isTip) {
            setIsTip(true)
            message.info('你还没有导入收藏夹噢，现在为您搜索系统自带的网站')
        }
    }
    // 防抖
    const debounceChange = useDebounce(onChange, 500)
    return (
        <Container >
            <div style={{ position: "relative" }}>
                <Input type="search" onChange={debounceChange} autoFocus placeholder="你可以在这里查找你的收藏夹内容噢~" />
                <SearchOutlined style={{ fontSize: "22px", position: "absolute", top: "18px", right: "30px" }} />
            </div>
        </Container>
    );
};
const Container = styled.div`
    color: var(--font-fg);
    display: flex;
    justify-content: center;
    margin: 50px ;
`
const Input = styled.input`
    width: 550px;
    height: 55px;
    font-size: 20px;
    outline: none;
    border: none;
    border-radius: 25px; 
    background: linear-gradient(145deg, var(--card-bg), var(--card-fg));
    box-shadow: 5px 5px 10px var(--card-sd),
               -5px -5px 10px var(--card-sf);
    text-indent: 2em;
    ::placeholder {
        font-size: 16px;
    }
`

export default SearchView;