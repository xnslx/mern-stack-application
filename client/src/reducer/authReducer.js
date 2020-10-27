import * as actionTypes from '../action/type';

const initialState = {
    isAuthenticated: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: false
            }
        default:
            return state
    }
}


export default authReducer;