import axios from 'axios';
import setAuthToken from '../middleware/middleware';
// import { SET_CURRENT_USER, GET_ERROR, CLEAR_ERROR, RETRIEVE_PASSWORD, GET_BACKEND_DATA, ADD_PRODUCT_FAVORITE_LIST, REMOVE_PRODUCT_FAVORITE_LIST, GET_PRODUCT_FAVORITE_LIST, EMPTY_PRODUCT_FAVORITE_LIST, ADD_PRODUCT_SHOPPING_CART, REMOVE_PRODUCT_SHOPPING_CART, EMPTY_PRODUCT_SHOPPING_CART, GET_PRODUCT_SHOPPING_CART, SAVE_SHIPPING_INFORMATION, PAY_SUCCESS } from './type';

export const signupUser = (userInfo, history) => (dispatch) => {
    axios.post('/signup', userInfo)
        .then(result => {
            console.log('result', result)
            dispatch({
                type: 'SIGNUP_SUCCESS',
                payload: result
            })
            history.push('/login')
            console.log(result)
        })
        .catch(err => {
            dispatch({
                type: 'SIGNUP_FAIL',
                payload: err.response.data
            })
            dispatch({
                type: 'CLEAR_ERROR'
            })
        })
}

export const loginUser = (currentUser, history) => (dispatch) => {
    axios.post('/login', currentUser)
        .then(result => {
            const { token, user } = result.data;
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: result.data
            })
            localStorage.setItem('userInfo', JSON.stringify(result.data))
            setAuthToken(token)
            dispatch(getProductFavList(user.userId, token));
            dispatch(getProductShoppingCart(user.userId, token))
            history.push('/')
        })
        .catch(err => {
            console.log('err', err)
            dispatch({
                type: 'LOGIN_FAIL',
                payload: err.response.data
            })
            dispatch({
                type: 'CLEAR_ERROR'
            })
        })
}

export const setCurrentUser = (user) => {
    return {
        type: 'SET_CURRENT_USER',
        payload: user
    }
}

export const logoutUser = (history) => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('favlist');
    localStorage.removeItem('shoppingcart')
    setAuthToken(false);
    dispatch({
        type: 'USER_LOGOUT'
    })
    history.push('/')
}

export const getErrorMessage = (error) => {
    return {
        type: 'GET_ERROR',
        payload: error
    }
}

export const clearError = () => {
    return {
        type: 'CLEAR_ERROR'
    }
}

export const getBackendData = result => {
    return {
        type: 'GET_BACKEND_DATA',
        payload: result
    }
}

export const retrievePassword = (email) => (dispatch) => {
    axios.post('/findpassword', email)
        .then(result => {
            dispatch(getBackendData(result.data))
        })
        .catch(err => {
            dispatch({
                type: 'GET_ERROR',
                payload: err.response.data
            })
        })
}

export const resetPassword = (verifiedPassword, history) => (dispatch) => {
    axios.post('/updatepassword', verifiedPassword)
        .then(result => {
            dispatch(getBackendData(result.data))
            history.push('/login')
        })
        .catch(err => {
            dispatch({
                type: 'GET_ERROR',
                payload: err.response.data
            })
        })
}

export const addProductToFavList = (productId, token) => (dispatch, getState) => {
    axios.post('/products/addfavorites', { productId: productId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            dispatch({ type: 'ADD_PRODUCT_FAVORITE_LIST', payload: productId })
            localStorage.setItem('favlist', JSON.stringify(getState().favoriteList.favoriteList))
        })
        .catch(err => {
            dispatch({
                type: 'GET_ERROR',
                payload: err.response.data
            })
        })
}

export const removeProductFromFavList = (productId, token) => (dispatch, getState) => {
    axios.post('/products/removefavorites', { productId: productId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            dispatch({ type: 'REMOVE_PRODUCT_FAVORITE_LIST', payload: productId })
            localStorage.setItem('favlist', JSON.stringify(getState().favoriteList.favoriteList))
        })
        .catch(err => {
            dispatch({
                type: 'GET_ERROR',
                payload: err.response.data
            })
        })
}

export const getProductFavList = (userId, token) => (dispatch) => {
    axios.get('/products/favoritelist', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(result => {
            dispatch({ type: 'GET_PRODUCT_FAVORITE_LIST', payload: result.data.map(item => item.productId._id) })
            localStorage.setItem('favlist', JSON.stringify(result.data.map(item => item.productId._id)))
        })
        .catch(err => {
            dispatch({
                type: 'GET_ERROR',
                payload: err.response.data
            })
        })
}

export const emptyProductFavList = userId => {
    return {
        type: 'EMPTY_PRODUCT_FAVORITE_LIST',
        payload: userId
    }
}

export const addProductToShoppingCart = (productId, token) => (dispatch, getState) => {
    axios.post('/products/addtoshoppingcart', { productId: productId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            dispatch({ type: 'ADD_PRODUCT_SHOPPING_CART', payload: productId })
            localStorage.setItem('shoppingcart', JSON.stringify(getState().shoppingCart.shoppingCart))
        })
        .catch(err => {
            dispatch({
                type: 'GET_ERROR',
                payload: err.response.data
            })
        })
}

export const removeProductFromShoppingCart = (productId, token) => (dispatch, getState) => {
    axios.post('/products/removefromshoppingcart', { productId: productId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => {
            dispatch({ type: 'REMOVE_PRODUCT_SHOPPING_CART', payload: productId })
            localStorage.setItem('shoppingcart', JSON.stringify(getState().shoppingCart.shoppingCart))
        })
        .catch(err => {
            dispatch({
                type: 'GET_ERROR',
                payload: err.response.data
            })
        })
}

export const getProductShoppingCart = (userId, token) => (dispatch) => {
    axios.get('/products/shoppingcart', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(result => {
            dispatch({ type: 'GET_PRODUCT_SHOPPING_CART', payload: result.data.map(item => item.productId._id) })
            localStorage.setItem('shoppingcart', JSON.stringify(result.data.map(item => item.productId._id)))
        })
        .catch(err => {
            dispatch({
                type: 'GET_ERROR',
                payload: err.response.data
            })
        })
}

export const emptyProductShoppingCart = userId => {
    return {
        type: 'EMPTY_PRODUCT_SHOPPING_CART',
        payload: userId
    }
}

export const saveShippingInformation = (shippingInfo) => {
    return {
        type: 'SAVE_SHIPPING_INFORMATION',
        payload: shippingInfo
    }
}


export const savePayment = (paymentInfo, shippingInfo) => (dispatch) => {
    return {
        type: 'SAVE_PAYMENT',
        payload: paymentInfo
    }
}

export const onSuccessBuy = (data, shippingInfo, token) => (dispatch, getState) => {
    axios.post('/products/checkout', { paymentInfo: data, shippingInfo: shippingInfo }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(result => {
            dispatch({
                type: 'ON_SUCCESS_BUY',
                payload: result
            })
            dispatch({
                type: 'EMPTY_PRODUCT_SHOPPING_CART'
            })
            localStorage.setItem('shoppingcart', JSON.stringify(getState().shoppingCart.shoppingCart))
        })
        .catch(err => {
            console.log(err)
        })
}