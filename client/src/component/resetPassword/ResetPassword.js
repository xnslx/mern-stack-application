import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {resetPassword} from '../../action/action';
import axios from 'axios';

const ResetPassword = (props) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({});
    const token = props.match.params.token;

    useEffect(() => {
        getErrorMessage()
    }, [props.error])

    const getErrorMessage = () => {
        if(props.error !== null) {
        setError(props.error.errors);
        }
    }

    console.log('error', error)
    
    const resetPasswordHandler = (e) => {
        e.preventDefault();
        props.dispatch(resetPassword({password: password, confirmPassword: confirmPassword, passwordToken: token},props.history))
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
        {error.length > 0? <ul>{error.map((err,index) => <li key={index}>{err.msg}</li>)}</ul> : null}
            <form action="" onSubmit={resetPasswordHandler}>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        error: state.error.message,
        backendData: state.backendData.backendData
    }
}

export default connect(mapStateToProps)(withRouter(ResetPassword));
