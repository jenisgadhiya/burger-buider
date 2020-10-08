import React from 'react'
import classes from './Order.css'

const Order = (props) => {
    const ingredients = []
    for (let igname in props.ingredients) {
        ingredients.push({
            name: igname,
            amount: props.ingredients[igname]
        })
    }
    const ingredientsOutput = ingredients.map(ig => {
        return <span style={{
            textTransform:'capitalize',
            display:'inline-block',
            margin:'0 8px',
            border:'1px solid #ccc',
            padding:'5px'
        }} key={ig.name}>{ig.name} ({ig.amount}) </span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients : {ingredientsOutput}</p>
            <p>Price : <strong>{props.price} &#8377;</strong></p>
        </div>)
}

export default Order