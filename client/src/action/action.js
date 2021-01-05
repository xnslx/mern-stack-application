import axios from 'axios';
import setAuthToken from '../middleware/middleware';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER, GET_ERROR, CLEAR_ERROR, RETRIEVE_PASSWORD, GET_BACKEND_DATA, ADD_PRODUCT_FAVORITE_LIST, REMOVE_PRODUCT_FAVORITE_LIST, GET_PRODUCT_FAVORITE_LIST, EMPTY_PRODUCT_FAVORITE_LIST, ADD_PRODUCT_SHOPPING_CART, REMOVE_PRODUCT_SHOPPING_CART, EMPTY_PRODUCT_SHOPPING_CART, GET_PRODUCT_SHOPPING_CART, SAVE_SHIPPING_INFORMATION, PAY_SUCCESS } from './type';

export const signupUser = (userInfo, history) => (dispatch) => {
    axios.post('/signup', userInfo)
        .then(result => {
            history.push('/login')
            console.log(result)
        })
        .catch(err => {
            // console.log(err)
            dispatch({
                type: 'GET_ERROR',
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
            localStorage.setItem('jwtToken', token)
            setAuthToken(token)
            console.log('result', result);
            dispatch(setCurrentUser(jwt.decode(token)));
            dispatch(getProductFavList(user.userId));
            dispatch(getProductShoppingCart(user.userId))
            history.push('/')
        })
        .catch(err => {
            // console.log(err)
            dispatch({
                type: 'GET_ERROR',
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
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}))
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
    // console.log('result', result)
    return {
        type: 'GET_BACKEND_DATA',
        payload: result
    }
}

export const retrievePassword = (email) => (dispatch) => {
    axios.post('/findpassword', email)
        .then(result => {
            console.log('result', result)
            dispatch(getBackendData(result.data))
        })
        .catch(err => {
            console.log('err', err)
            dispatch({
                type: 'GET_ERROR',
                payload: err.response.data
            })
        })
}

export const resetPassword = (verifiedPassword, history) => (dispatch) => {
    axios.post('/updatepassword', verifiedPassword)
        .then(result => {
            console.log('result', result)
            dispatch(getBackendData(result.data))
            history.push('/login')
        })
        .catch(err => {
            console.log('err', err)
            dispatch({
                type: 'GET_ERROR',
                payload: err.response.data
            })
        })
}

export const addProductToFavList = (productId) => (dispatch) => {
    // console.log('productId', productId)
    axios.post('/products/addfavorites', { productId: productId })
        .then(result => {
            console.log('result', result)
                // dispatch(getBackendData(result.data))
            dispatch({ type: 'ADD_PRODUCT_FAVORITE_LIST', payload: productId })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: 'GET_ERROR',
                payload: err.response.data
            })
        })
}

export const removeProductFromFavList = (productId) => (dispatch) => {
    console.log('productId', productId)
    axios.post('/products/removefavorites', { productId: productId })
        .then(result => {
            console.log('result', result)
            dispatch({ type: 'REMOVE_PRODUCT_FAVORITE_LIST', payload: productId })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: 'GET_ERROR',
                payload: err.response.data
            })
        })
}

export const getProductFavList = (userId) => (dispatch) => {
    axios.get('/products/favoritelist').then(result => {
            // console.log(result)
            dispatch({ type: 'GET_PRODUCT_FAVORITE_LIST', payload: result.data.map(item => item.productId._id) })
        })
        .catch(err => {
            console.log(err)
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

export const addProductToShoppingCart = (productId) => (dispatch) => {
    // console.log('productId', productId)
    axios.post('/products/addtoshoppingcart', { productId: productId })
        .then(result => {
            console.log('result', result)
                // dispatch(getBackendData(result.data))
            dispatch({ type: 'ADD_PRODUCT_SHOPPING_CART', payload: productId })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: 'GET_ERROR',
                payload: err.response.data
            })
        })
}

export const removeProductFromShoppingCart = (productId) => (dispatch) => {
    console.log('productId', productId)
    axios.post('/products/removefromshoppingcart', { productId: productId })
        .then(result => {
            console.log('result', result)
            dispatch({ type: 'REMOVE_PRODUCT_SHOPPING_CART', payload: productId })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: 'GET_ERROR',
                payload: err.response.data
            })
        })
}

export const getProductShoppingCart = (userId) => (dispatch) => {
    axios.get('/products/shoppingcart').then(result => {
            // console.log(result)
            dispatch({ type: 'GET_PRODUCT_SHOPPING_CART', payload: result.data.map(item => item.productId._id) })
        })
        .catch(err => {
            console.log(err)
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