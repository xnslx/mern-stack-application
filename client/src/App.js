import React from 'react';
import './App.css';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from './reducer/index';
import Nav from './component/nav/Nav';
import Main from './component/main/Main';
import Signup from './component/signup/Signup';
import Login from './component/login/Login';
import Dashboard from './component/dashboard/Dashboard';
import PrivateRoute from './component/PrivateRoute';
import FindPassword from './component/findpassword/FindPassword';
import ResetPassword from './component/resetPassword/ResetPassword';
import Products from './component/products/Products';
// import Products from './component/products/Products';
import ProductDetail from './component/products/ProductDetail';
import FilteredProductsList from './component/products/FilteredProductsList';
import FavListDetail from './component/favlistdetail/FavListDetail';
import ShoppingCart from './component/shoppingcart/ShoppingCart';
import {faFilter, faCartPlus, faStar} from '@fortawesome/free-solid-svg-icons';
import {faHeart, faUser, faStart} from '@fortawesome/free-regular-svg-icons';
import{library} from '@fortawesome/fontawesome-svg-core';
library.add(faFilter, faHeart,faCartPlus,faUser, faStar,faStar);

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Nav />
          <Route path='/favoritelist' component={FavListDetail}/>
          {/* <Route path='/shoppingcart' component={ShoppingCart}/> */}
          <Switch>
            <Route path='/signup' component={Signup}/>
            <Route path='/login' component={Login}/>
            <PrivateRoute  exact path='/dashboard' component={Dashboard}/>
            <Route path='/' exact component={Main}/>
            {/* <Route path='/' component={Products}/> */}
            <Route path='/shoppingcart' component={ShoppingCart}/>
            <Route path='/findpassword' component={FindPassword}/>
            <Route path='/reset/:token' component={ResetPassword}/>
            <Route path='/:prodId' component={ProductDetail}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
