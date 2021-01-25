import * as actionTypes from '../action/type';

const isUserLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                loading: true
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case actionTypes.LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
};

export default isUserLoginReducer;