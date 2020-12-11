import * as actionTypes from '../action/type';

const initialState = {
    favoriteList: []
}

const favoriteListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT_FAVORITE_LIST:
            if (state.favoriteList.includes(action.payload)) {
                return {...state, favoriteList: state.favoriteList }
            } else {
                const updatedItem = state.favoriteList.concat(action.payload)
                return {...state, favoriteList: updatedItem }
            }
        case actionTypes.REMOVE_PRODUCT_FAVORITE_LIST:
            return {
                ...state,
                favoriteList: state.favoriteList.filter(id => id !== action.payload)
            }
        default:
            return state
    }
}


export default favoriteListReducer;