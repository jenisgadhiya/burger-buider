import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


import CheckoutSummry from '../../components/Order/CheckoutSummry/CheckoutSummry'


class Checkout extends Component{

    checkoutcancelhandler=()=>{
        this.props.history.goBack()
    }

    checkoutcontinuehandler=()=>{
        this.props.history.push('/checkout/contact-data')
    }
    render(){
        let summry=<Redirect to='/' />
        if(this.props.ings){
            
            summry=(                
                <CheckoutSummry 
              ingredient={this.props.ings}
              onCheckoutCanceled={this.checkoutcancelhandler}
              onCheckoutContinued={this.checkoutcontinuehandler}  />
            )
        }
        return summry
    }
}

const mapStateToProps=(state)=>{
    return{
        ings:state.burgerBuilder.ingredient,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout)