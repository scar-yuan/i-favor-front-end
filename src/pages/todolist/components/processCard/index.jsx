import React from 'react'
import { Decoration9 } from '@jiaminghi/data-view-react'//DataV的动态环图

import {ProcessCard} from './StyledProcessCard.js'
 
export default function index(props) {

    const {finshData} = props
    const percentage = Math.floor((finshData.done/finshData.total)*100)
    return (
        <ProcessCard>
            <Decoration9  style={{width: '8vw', height: '8vw',marginLeft:"4px"}}>{percentage}%</Decoration9>
            <div className="processDesc">
                <div className="cardDesc"><span style={{display:"inline-block",fontWeight:"bold", width:"3.5vw",marginRight:"2.5vw"}}>Total:</span><span style={{opacity:"0.8",color:"#a4a2a2"}}>{finshData.total}</span></div>
                <div className="cardDesc"><span style={{display:"inline-block",fontWeight:"bold", width:"3.5vw",marginRight:"2.5vw"}}>Done:</span><span style={{opacity:"0.8",color:"#a4a2a2"}}>{finshData.done}</span></div>
                <div className="cardDesc"><span style={{display:"inline-block",fontWeight:"bold", width:"3.5vw",marginRight:"2.5vw"}}>Doing:</span><span style={{opacity:"0.8",color:"#a4a2a2"}}>{finshData.total-finshData.done}</span></div>
            </div>
        </ProcessCard>
    )
}
