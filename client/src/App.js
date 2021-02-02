import React from 'react';
import './App.css';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';


import {Provider} from 'react-redux';


import Main from './component/main/Main';
import Signup from './component/signup/Signup';
import Login from './component/login/Login';

import PrivateRoute from './component/PrivateRoute';
import FindPassword from './component/findpassword/FindPassword';
import ResetPassword from './component/resetPassword/ResetPassword';
import Products from './component/products/Products';
import ProductDetail from './component/products/ProductDetail';

import FavListDetail from './component/favlistdetail/FavListDetail';
import ShoppingCart from './component/shoppingcart/ShoppingCart';
import Checkout from './component/checkout/Checkout';
import Payment from './component/payment/Payment';
import OrderSummary from './component/orderSummary/OrderSummary';
import OrderHistory from './component/orderhistory/OrderHistory';
import {faFilter, faCartPlus, faStar} from '@fortawesome/free-solid-svg-icons';
import {faHeart, faUser, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import{library} from '@fortawesome/fontawesome-svg-core';

import store from './reducer/index';
library.add(faFilter, faHeart,faCartPlus,faUser, faStar,faStar,faTrashAlt);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Main exact component={Main}/>
          <Switch>
            <PrivateRoute path='/checkout' component={Checkout}/>
            <PrivateRoute path='/products/order/:orderId' component={OrderSummary}/>
            <PrivateRoute path='/orderhistory' component={OrderHistory}/>
            <PrivateRoute path='/payment' component={Payment}/>
            <Route path='/signup' component={Signup}/>
            <Route path='/login' component={Login}/>
            <Route path='/' exact component={Products}/>
            <PrivateRoute path='/shoppingcart' component={ShoppingCart}/>
            <PrivateRoute path='/favoritelist' component={FavListDetail}/>
            <PrivateRoute path='/findpassword' component={FindPassword}/>
            <PrivateRoute path='/reset/:token' component={ResetPassword}/>
            <PrivateRoute path='/:prodId' component={ProductDetail}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
