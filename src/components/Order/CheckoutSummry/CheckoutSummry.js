import React from 'react'

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummry.css'

const CheckoutSummry=(props)=>{
    return(
        <div className={classes.CheckoutSummry}>
            <h1>We hpoe it Taste well...!!</h1>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredient={props.ingredient} />
            </div>
            <Button btnType='Danger' clicked={props.onCheckoutCanceled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.onCheckoutContinued}>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummry