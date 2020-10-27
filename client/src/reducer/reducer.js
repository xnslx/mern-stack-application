import { combineReducers } from 'redux';

const initialState = {
    isAuthenticated: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        default: return state
    }
}

const rootReducer = combineReducers({
    auth: authReducer
})

export default rootReducer;