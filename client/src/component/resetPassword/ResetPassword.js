import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
// import {connect} from 'react-redux';
// import {resetPassword} from '../../action/action';
import axios from 'axios';

const ResetPassword = (props) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({});
    // const [resetTokenExpiration, setResetTokenExpiration] = useState('');
    const [userId, setUserId] = useState('')
    const [formData, setFormData] = useState({
        password:'', confirmPassword:''
    })
    
    const verifiedPassword = {
        password:password,
        confirmPassword: confirmPassword
    }
    const token = props.match.params.token;

    const changeHandler = (e) => {
        setFormData({...formData, [e.target.value]: e.target.value})
    }

    useEffect(() => {
        axios.post('/updatepassword', {
            password:password,confirmPassword:confirmPassword,passwordToken:token
        }).then(result => {
            console.log('result', result)
            if(result.data.message === 'password updated') {
                props.history.push('/login')
            }
        }).catch(err => {
            console.log(err)
        })
    },[])
    
    const resetPasswordHandler = (e) => {
        e.preventDefault();
        // axios.post('/updatepassword', {
        //     password:password,confirmPassword:confirmPassword,passwordToken:token
        // }).then(result => {
        //     console.log('result', result)
        //     if(result.data.message === 'password updated') {
        //         props.history.push('/login')
        //     }
        // }).catch(err => {
        //     console.log(err)
        // })
    }


    return (
        <div>
            <form action="" onSubmit={resetPasswordHandler}>
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </form>
            <form action="">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                    type="password" 
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

// const mapStateToProps = (state) => {
//     console.log('state', state)
//     return {
//         auth: state.auth,
//         error: state.error,
//         backendData: state.backendData.backendData
//     }
// }

export default withRouter(ResetPassword);
