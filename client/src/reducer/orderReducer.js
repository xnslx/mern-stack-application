import * as actionTypes from '../action/type';

const initialState = {
    shippingInfo: {},
    paymentInfo: {},
    order: {}
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_SHIPPING_INFORMATION:
            return {
                ...state,
                shippingInfo: action.payload
            }
        case actionTypes.SAVE_PAYMENT:
            return {
                ...state,
                paymentInfo: action.payload
            }
        case actionTypes.ON_SUCCESS_BUY:
            return {
                ...state,
                order: action.payload.data.result
            }
        default:
            return state
    }
}


export default orderReducer;