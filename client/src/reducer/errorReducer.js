import { GET_ERROR } from '../action/type';

const initialState = null;

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ERROR':
            return action.payload
        default:
            return state
    }
}


export default errorReducer;