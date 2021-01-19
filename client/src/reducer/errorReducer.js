import { GET_ERROR, CLEAR_ERROR } from '../action/type';

const initialState = {
    message: null,
    hasError: false
};

const errorReducer = (state = initialState, action) => {
    console.log('action', action)
    switch (action.type) {
        case 'GET_ERROR':
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