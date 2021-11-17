import React from 'react';
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons'
const SearchView = () => {
    const favorData = JSON.parse(localStorage.getItem('flatFavor'))

    function checkStrContain(i, j) {
        if (!i || !j) {
            return false;
        }
        if (i.charAt(0) != j.charAt(0)) {
            return false;
        }
        i = i.substr(1, i.length - 1);
        j = j.substr(1, j.length - 1);
        var a;
        var b;
        if (i.length > j.length) {
            a = i;
            b = j;
        } else {
            a = j;
            b = i;
        }
        var count = 0;
        for (var bi = 0; bi < b.length; bi++) {
            var bArr = b.split("");
            if (a.indexOf(bArr[bi]) != -1) {
                count++;
            } else {
                break;
            }
        }
        if (b.length == count) {
            return true;
        } else {
            return false;
        }
    }

    function getArrayByName(name, array, length) {
        if (array.length < 1) {
            return;
        }
        var result = [];
        for (var key in array) {
            if (checkStrContain(array[key].name, name) && result.length < length) {
                result.push(array[key])
            }
        }
        return result
    }
    const onChange = (e) => {
        let key = e.target.value;
        // const findResult = favorData.find(item => item.name === key)
        const findResult = getArrayByName(key, favorData, 10)
        console.log(findResult);
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