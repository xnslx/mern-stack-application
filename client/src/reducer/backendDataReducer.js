import { GET_BACKEND_DATA } from '../action/type';

const initialState = {
    backendData: ''
}

const backendDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BACKEND_DATA':
            return {
                ...state,
                backendData: action.payload
            }
        default:
            return state;
    }
}

export default backendDataReducer;