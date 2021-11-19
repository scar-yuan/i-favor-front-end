import React from 'react'
import { Progress } from 'antd'
import { Loading } from '@jiaminghi/data-view-react'
import {RecentTodoCard} from './styledRecentTodoCard.js'

export default function index(props) {
    const {type,finshData} = props
    return (
        <RecentTodoCard>
            <div>
                {type === 'doing'?<Loading style={{width:"7vh",height:"46px",marginLeft:"0.5vw"}}/>:<Progress type="circle" percent={100} width={46} style={{marginLeft:"0.5vw"}}  />}
            </div>
            <div className="cardDesc">
                {type === 'doing'?finshData.firstTodo:finshData.justDone}
            </div>
            <div className="impontentTodo">
                {type === 'doing'?'IMPORTANCE':'Just soso'}
            </div>
        </RecentTodoCard>
    )
}
