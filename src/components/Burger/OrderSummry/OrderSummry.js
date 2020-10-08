import React from 'react'

import Button from '../../UI/Button/Button'

const OrdeSummry=(props)=>{

    const ingredientsummry=Object.keys(props.ingredient).map((igkey)=>{
    return <li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}:{props.ingredient[igkey]}</span></li>
    })

    return (
        <>
        <h3>Your Order</h3>
        <p>A delecious Burger with following ingredients:</p>
        <ul>
            {ingredientsummry}
        </ul>
        <p><strong>Total Price:{props.price}</strong></p>
        <p>Continue to checkout ?</p>
        <Button btnType='Danger' clicked={props.cancel}>CANCEL</Button>
        <Button btnType='Success'clicked={props.continue}>CONTINUE</Button>
        </>
    )
}

export default OrdeSummry