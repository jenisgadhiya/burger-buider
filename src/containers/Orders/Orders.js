import React, { Component } from 'react'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import axios from '../../Axios-order'
import Witherrorhandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {


    componentDidMount = () => {
        this.props.onOrderFetch(this.props.token,this.props.userId)
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.order.map(order => (
                <Order key={order.id}
                    ingredients={order.ingredient}
                    price={order.price} />
            ))
        }

        let title=<h3 style={{color:'brown',width:'45%',margin:'20px auto',padding:'10px',textAlign:'center',border:'1px solid #ccc',boxSizing:'border-box',}}>Your Orders</h3>
        if(this.props.order.length===0){
            title=<h3 style={{color:'brown',width:'50%',margin:'20px auto',padding:'10px',textAlign:'center',border:'1px solid #ccc',boxSizing:'border-box',}}>You Have Not Place Any Order</h3>
        }

        return (
            <div>
                {title}
                {orders}
            </div>

        )
    }
}

const mapstatetoprops = (state) => {
    return {
        order: state.order.orders,
        loading: state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapdispatchtoprops = dispatch => {
    return {
        onOrderFetch: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}
export default connect(mapstatetoprops, mapdispatchtoprops)(Witherrorhandler(Orders, axios))