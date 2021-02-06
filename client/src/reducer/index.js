import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import backendDataReducer from './backendDataReducer';
import favoriteListReducer from './favoriteListReducer';
import shoppingCartReducer from './shoppingCartReducer';
import orderReducer from './orderReducer';
import isUserLoginReducer from './isUserLoginReducer';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    isUserLogin: {
        user: localStorage.getItem('userInfo') ?
            JSON.parse(localStorage.getItem('userInfo')) : null
    },
    favoriteList: {
        favoriteList: localStorage.getItem('favlist') ?
            JSON.parse(localStorage.getItem('favlist')) : []
    },
    shoppingCart: {
        shoppingCart: localStorage.getItem('shoppingcart') ?
            JSON.parse(localStorage.getItem('shoppingcart')) : []
    }
}

const rootReducer = combineReducers({
    isUserLogin: isUserLoginReducer,
    auth: authReducer,
    error: errorReducer,
    backendData: backendDataReducer,
    favoriteList: favoriteListReducer,
    shoppingCart: shoppingCartReducer,
    order: orderReducer
});

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk)
))

export default store;