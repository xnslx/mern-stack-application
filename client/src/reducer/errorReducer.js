import { GET_ERROR, CLEAR_ERROR } from '../action/type';

const initialState = null;

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ERROR':
            return action.payload
        case 'CLEAR_ERROR':
            return state
        default:
            return state
    }
}


export default errorReducer;