import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import backendDataReducer from './backendDataReducer';
import favoriteListReducer from './favoriteListReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    backendData: backendDataReducer,
    favoriteList: favoriteListReducer
});

export default rootReducer;