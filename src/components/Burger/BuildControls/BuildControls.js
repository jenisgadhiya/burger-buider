import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls=[
    { label:'Salad', type:'salad'},
    { label:'Bacon', type:'bacon'},
    { label:'Cheese', type:'cheese'},
    { label:'Meat', type:'meat'},
]


const BuildControls=(props)=>(
    <div className={classes.BuildControls}>
        <p>Current price of Burger : <strong>{props.total}</strong></p>
        {controls.map((ctrl)=>{
            return <BuildControl 
            key={ctrl.label} 
            label={ctrl.label} 
            added={()=>props.ingredientAdded(ctrl.type)}
            removed={()=>props.ingredientremoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}/>
        })}
        <button className={classes.OrderButton} onClick={props.ordered} disabled={!props.purchaseable}>{props.isAuth?'ORDER NOW':'Signup|login to Order'}</button>
    </div>
)

export default BuildControls