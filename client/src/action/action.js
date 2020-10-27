import axios from 'axios';

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