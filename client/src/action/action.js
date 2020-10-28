import axios from 'axios';
import setAuthToken from '../middleware/middleware';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './type';

export const signupUser = (userInfo, history) => {
    axios.post('/signup', userInfo)
        .then(result => {
            history.push('/login')
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
}

export const loginUser = (currentUser) => (dispatch) => {
    axios.post('/login', currentUser)
        .then(result => {
            const { token } = result.data;
            localStorage.setItem('jwtToken', token)
            setAuthToken(token)
                // console.log('result', result);
            dispatch(setCurrentUser(jwt.decode(token)))
        })
        .catch(err => {
            console.log(err)
        })
}

export const setCurrentUser = (user) => {
    return {
        type: 'SET_CURRENT_USER',
        payload: user
    }
}