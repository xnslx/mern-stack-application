import * as actionTypes from '../action/type';

const initialState = {
    favoriteList: []
}

const favoriteListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT_FAVORITE_LIST:
            return {
                ...state,
                favoriteList: [...state.favoriteList, action.payload]
            }
        case actionTypes.REMOVE_PRODUCT_FAVORITE_LIST:
            return {
                ...state,
                favoriteList: state.favoriteList.filter(id => id !== action.payload)
            }
        case actionTypes.GET_PRODUCT_FAVORITE_LIST:
            return {...state, favoriteList: action.payload }
        case actionTypes.EMPTY_PRODUCT_FAVORITE_LIST:
            return {
                ...state,
                favoriteList: []
            };
        default:
            return state
    }
}


export default favoriteListReducer;