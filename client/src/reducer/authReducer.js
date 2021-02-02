import * as actionTypes from '../action/type';
const isEmpty = require('is-empty');

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SET_CURRENT_USER:
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                loading: false
            }
        case actionTypes.RETRIEVE_PASSWORD:
            return {
                ...state,
                isAuthenticated: false,
                user: action.payload
            }
        case actionTypes.RESET_PASSWORD:
            return {
                ...state,
                isAuthenticated: false,
                user: action.payload
            }
        case actionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                user: action.payload.data
            }
        default:
            return state
    }
}


export default authReducer;