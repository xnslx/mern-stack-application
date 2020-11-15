import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
// import {connect} from 'react-redux';
// import {resetPassword} from '../../action/action';
import axios from 'axios';

const ResetPassword = (props) => {
    // console.log('props', props)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({})
    
    const verifiedPassword = {
        password:password,
        confirmPassword: confirmPassword
    }
    const token = props.match.params.token;
    console.log(password)

    const resetPasswordHandler = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        axios.get('/updatepassword/'+ token).then(result => {
                console.log('result',result)
                if(result.data.message === 'password link accepted') {
                    setError(null)
                }
            }).catch(err => {
                console.log(err)
            })
    },[])

    useEffect(() => {
        axios.post('/updatepassword', verifiedPassword).then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err)
        })
    },[])


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
