import React from 'react'

import classes from './Burger.css'
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient'

const Burger=(props)=>{

    let transformIngredient=Object.keys(props.ingredient).map(igKey=>{
        return [...Array(props.ingredient[igKey])].map((_,i)=>{
            return <BurgerIngredient key={igKey+i} type={igKey}/>
        })
    }).reduce((arr,el)=>{
        return arr.concat(el)
    },[])
    if(transformIngredient.length===0){
        transformIngredient=<p>please start adding ingredients..</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformIngredient}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default Burger