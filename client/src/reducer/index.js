import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer
});

export default rootReducer;