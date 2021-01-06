import * as actionTypes from '../action/type';

const initialState = {
    shippingInfo: {},
    paymentInfo: {}
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
                shippingInfo: action.payload.shippingInfo,
                paymentInfo: action.payload.paymentInfo
            }
        default:
            return state
    }
}


export default orderReducer;