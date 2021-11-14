import React from 'react';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons'
const SearchView = () => {
    const onChange = (e) => {
        console.log(e.target.value);
    }
    return (
        <Container >
            <div style={{ position: "relative" }}>
                <Input type="search" onChange={onChange} autoFocus placeholder="你可以在这里查找你的收藏夹内容噢~" />
                <SearchOutlined style={{ fontSize: "22px", position: "absolute", top: "18px", right: "30px" }} />
            </div>
        </Container>
    );
};
const Container = styled.div`
    
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
    box-shadow:  20px 20px 40px var(--card-sd),
               -20px -20px 40px var(--card-sf);
    text-indent: 2em;
    ::placeholder {
        font-size: 16px;
    }
`

export default SearchView;