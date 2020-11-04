import axios from 'axios';
import setAuthToken from '../middleware/middleware';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER, GET_ERROR, CLEAR_ERROR } from './type';

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
        })
}

export const loginUser = (currentUser, history) => (dispatch) => {
    axios.post('/login', currentUser)
        .then(result => {
            const { token } = result.data;
            localStorage.setItem('jwtToken', token)
            setAuthToken(token)
                // console.log('result', result);
            dispatch(setCurrentUser(jwt.decode(token)))
            history.push('/dashboard')
        })
        .catch(err => {
            // console.log(err)
            dispatch({
                type: 'GET_ERROR',
                payload: err.response.data
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