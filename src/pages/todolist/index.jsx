import React,{useState,useEffect,useRef} from 'react'
import {EditOutlined} from '@ant-design/icons'//antd的icon图标
import {Link} from 'react-router-dom'
import cloneDeep from "lodash/cloneDeep";//深拷贝
import {nanoid} from 'nanoid'
import dayjs from 'dayjs'

import instance from '../../utils/http.js'//axios封装
import TodoContainer from './components/todoContainer'
import ProcessCard  from './components/processCard'
import RecentTodoCard from './components/recentTodoCard'
import {TodoLayoutBox,TodoInput,BackButton} from './StyledTodoList'
const token = JSON.parse(localStorage.getItem("token"))?.token




function TodoList() {
    const inputRef = useRef()
    const [userTodo,setUserTodo] = useState([])
    const [finshData,setFinshData] =useState({
        total:0,
        done:0,
        justDone:'',
        firstTodo:''
    })
    useEffect(() => {
        console.log('effect执行了')
        instance.get("/todo",{
            headers: {
                            Authorization: `Bearer ` + token
                        }
        })
        .then((res) => {
            let data = res.data.data
            setUserTodo( () =>{

                return data
            })
            setFinshData((finshData) => {
                let doneNums = 0
                let newState = cloneDeep(finshData)
                console.log('333333333',newState)
                console.log('22222222222222222222',userTodo)
                for(let i = 0;i<data.length;i++){
                    if(data[i].done === true){
                    console.log('11111111111111111111')
                    doneNums +=1
                }
                }
                newState.total = data.length
                newState.done = doneNums
                console.log('麻辣',newState)
                return newState
            })
        })
        // setTimeout(()=>{//axios请求
        //     let data = [{id:7,todo:'吃饭',createTime:1637226288000,done:false},
        //     {id:2,todo:"睡觉",createTime:1637226289999,done:true},
        //     {id:1,todo:"打豆豆",createTime:1637326288000,done:false},
        //     {id:4,todo:"打代码",createTime:1637226289999,done:false},
        //     {id:3,todo:" play basketball",createTime:1637326278000,done:false},
        //     {id:6,todo:"王者出击",createTime:1637226239999,done:true},
        //     ]
        // }, 0);


    },[])
    //setUserTodo('111')
 
    const add = (value) => {
        setUserTodo(userTodo => [...userTodo,{id:nanoid(),createTime:dayjs().valueOf(),todo:value,done:false}])
        setFinshData((finshData) => {
            let newState = cloneDeep(finshData)
            newState.total +=1
            newState.firstTodo = value
            return newState
        })
        console.log('add执行了',finshData)
        // axios.post('xxxx',{
        //         TodoValue,
        //         todoId
        // })
        return {code:"20003"}
    }
    const update = (id) => {
        // axios.put('xxx',{

        // })

        setUserTodo(userTodo => {
            console.log('查看初始转台',userTodo)
            let newState1 = cloneDeep(userTodo)
            for(let i = 0;i<userTodo.length;i++){
                console.log(userTodo[i].id)
                if(userTodo[i].id === id){
                    console.log('开始转换')
                    if(newState1[i].done){
                        setFinshData((finshData) => {return {...finshData,done:finshData.done-1}})
                    } else {
                        setFinshData((finshData) => {return {...finshData,done:finshData.done+1}})
                    }
                    newState1[i].done = !userTodo[i].done
                    
                }
                console.log('update',newState1)
            }
            return newState1
        })
        return {code:"20003"}
    }
    const putData = () => {
        console.log('7777777777777777777777777777777777777')
        instance.put("/todo",{todo:userTodo},{
            headers: {
                            Authorization: `Bearer ` + token
                        }
        })
        .then(res => {
            if(res.data.code === "20003"){
                console.log('更新失败了')
            } else{
                console.log(res.data.message)
            }
        })
    }
    return (
        <TodoLayoutBox>
            <div className="leftTodoBox" style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                <div style={{display:"flex",justifyContent:"space-around",height:"10vh",alignItems:"center"}}>
                    <div><Link to="/">
                        <BackButton className="backButton" onClick={putData}>
                            <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
                            <span>Back</span>
                        </BackButton>
                        </Link></div>
                    <div style={{position:"relative",width:"20vw",right:"-5vw"}}  >
                        <TodoInput  ref={inputRef} placeholder="      请输入Todo~" type="text"  style={{color:"var(--font-fg"}}/>
                        <EditOutlined onClick={() => {add(inputRef.current.value) ;inputRef.current.value = ''}} style={{position:"absolute",fontSize:"1.4rem",right:"-15vw",top:"1vh" ,color:"var(--font-fg)"}} />
                    </div>
                </div>
                <TodoContainer done={false} update={update} userTodo={userTodo} setFinshData={setFinshData}></TodoContainer>
            </div>
            <div className="centerTodoBox">
                <div style={{display:"flex", justifyContent:"space-around",marginBottom:"13vh"}}>
                    <RecentTodoCard type="doing" finshData={finshData}></RecentTodoCard>
                    <RecentTodoCard type="done" finshData={finshData}></RecentTodoCard>   
                </div>
                <ProcessCard finshData={finshData} ></ProcessCard>
            </div>
            <div className="rightTodoBox">
            <TodoContainer done={true} update={update} userTodo={userTodo} setFinshData={setFinshData} ></TodoContainer>
            </div>
        </TodoLayoutBox>
    )
}
export default TodoList
