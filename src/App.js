import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import ContactData from './containers/Checkout/ContactData/ContactData'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
 

  componentDidMount = () => {
    this.props.onAuthCheck()
  }

  render() {

    let routes = (
      <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/auth' component={asyncAuth} />
        <Redirect to='/' />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout} exact />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/checkout/contact-data' component={ContactData} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={asyncAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
          {/* <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/checkout' component={Checkout} exact />
            <Route path='/orders' component={Orders} />
            <Route path='/checkout/contact-data' component={ContactData} />
            <Route path='/logout' component={Logout} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch> */}
        </Layout>
      </div>
    )
  }

}

const mapstatetoprops = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheck: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapstatetoprops, mapDispatchToProps)(App);
