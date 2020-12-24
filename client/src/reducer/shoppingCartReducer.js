import * as actionTypes from '../action/type';

const initialState = {
    shoppingCart: []
}

const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT_SHOPPING_CART:
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, action.payload]
            }
        case actionTypes.REMOVE_PRODUCT_SHOPPING_CART:
            return {
                ...state,
                shoppingCart: state.shoppingCart.filter(id => id !== action.payload)
            }
        case actionTypes.GET_PRODUCT_SHOPPING_CART:
            return {...state, shoppingCart: action.payload }
        case actionTypes.EMPTY_PRODUCT_SHOPPING_CART:
            return {
                ...state,
                shoppingCart: []
            };
        default:
            return state
    }
}


export default shoppingCartReducer;