import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../Axios-order'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderSummry from '../../components/Burger/OrderSummry/OrderSummry'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'



export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onIngredientFetched()
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map((key) => {
            return ingredients[key]
        }).reduce((acc, cur) => {
            return acc + cur
        }, 0)

        return sum > 0
    }


    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purchasing: true })
        }else{
            this.props.history.push('/auth')
        }
        
    }

    purchaseCloseHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinue = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }



    render() {

        const disableinfo = {
            ...this.props.ings
        }
        for (let key in disableinfo) {
            disableinfo[key] = disableinfo[key] <= 0
        }

        let burger = this.props.error ? <h1 style={{ color: 'red' }}>ingredient cannot be loaded...</h1> : <Spinner />
        let Ordersummry = null
        if (this.props.ings) {
            burger = (
                <>
                    <Burger ingredient={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientremoved={this.props.onIngredientRemoved}
                        disabled={disableinfo}
                        total={this.props.total}
                        isAuth={this.props.isAuthenticated}
                        ordered={this.purchaseHandler}
                        purchaseable={this.updatePurchaseState(this.props.ings)} />
                </>
            )
            Ordersummry = <OrderSummry
                ingredient={this.props.ings}
                cancel={this.purchaseCloseHandler}
                price={this.props.total}
                continue={this.purchaseContinue} />;
        }

        return (
            <>
                <Modal show={this.state.purchasing} Modalclose={this.purchaseCloseHandler}>
                    {Ordersummry}
                </Modal>
                {burger}
            </>

        )
    }
}

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredient,
        total:state.burgerBuilder.total,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token!==null
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded:(igname)=>dispatch(actions.addIngredient(igname)),
        onIngredientRemoved:(igname)=>dispatch(actions.removeIngredient(igname)),
        onIngredientFetched:()=>dispatch(actions.initIngredient()),
        onInitPurchase:()=>dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))