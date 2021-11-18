import React,{useState,useEffect,useContext,createContext} from 'react'
import { Empty } from 'antd';
import Button from 'antd/lib/button';
import QueueAnim from 'rc-queue-anim';
import cloneDeep from "lodash/cloneDeep";//深拷贝

import {TodoContainerBox,DivInLi,TodoHeader,Radio} from './StyledTodoContainer.js'

function TodoContainer(props) {
    const [state,setState] = useState({
        show: true,
        items: [

        ],
      })
      const finshData = useContext(createContext(true))
      useEffect(() => {
        const {userTodo,done,update,setFinshData} = props
        console.log('看一下',userTodo)
        setState(state => {
          let newState1 = cloneDeep(state)
           newState1.items =  userTodo.filter(item => {return item.done === done}).map(item => {
              return <li key={item.id} ><DivInLi ><Radio readOnly={true} type="radio" checked={done} onClick={() => update(item.id)} /><p style={{width:"17vw",textAlign:"center"}}>{item.todo}</p><p style={{color:"gray",opacity:"0.8"}}>19:00</p></DivInLi></li>
           } )
           console.log('newState1.items',newState1.items)
           setFinshData((finshData) => {
            // console.log('44444444',{...finshData,[temp]:newState1[0]})
             let temp 
             done?temp = 'justDone':temp = 'firstTodo'
             const tempp  = userTodo.filter(item => {return item.done === done})[0]
             if(tempp){
               return {...finshData,[temp]:tempp.todo}
             }
             return finshData
             
           })
           return newState1
        })
        
      },[props.userTodo])
      const {done} = props


    return (
        <TodoContainerBox>
        <div className="todoBox">
        <TodoHeader><div className="HeaderDesc">{done?'Done':'Todo'}</div><div className="TodoNums">{state.items.length}</div></TodoHeader>
          <QueueAnim component="ul" type={['right', 'left']} leaveReverse>
                {(state.show && state.items.length !== 0)? state.items :<Empty style={{marginTop:"10vh"}} description="写点什么吧~"/>}
          </QueueAnim>
        </div>


    </TodoContainerBox>
    )
}
export default TodoContainer
