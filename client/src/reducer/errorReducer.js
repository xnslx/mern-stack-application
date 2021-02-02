import { GET_ERROR, CLEAR_ERROR, LOGIN_FAIL } from '../action/type';

const initialState = {
    message: null,
    hasError: false
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ERROR':
        case 'LOGIN_FAIL':
        case 'SIGNUP_FAIL':
            return {
                ...state,
                message: action.payload,
                hasError: true
            }
        case 'CLEAR_ERROR':
            return {
                ...state,
                message: null
            }
        default:
            return state
    }
}


export default errorReducer;