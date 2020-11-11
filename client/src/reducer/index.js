import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import backendDataReducer from './backendDataReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    backendData: backendDataReducer
});

export default rootReducer;