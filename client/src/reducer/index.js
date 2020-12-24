import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import backendDataReducer from './backendDataReducer';
import favoriteListReducer from './favoriteListReducer';
import shoppingCartReducer from './shoppingCartReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    backendData: backendDataReducer,
    favoriteList: favoriteListReducer,
    shoppingCart: shoppingCartReducer
});

export default rootReducer;