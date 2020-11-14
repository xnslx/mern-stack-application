import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
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

    const resetPasswordHandler = (e) => {
        e.preventDefault();
        axios.post(`/updatepassword/${token}`, verifiedPassword).then(result => {
            console.log('result',result)
        }).catch(err => {
            console.log(err)
        })
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

export default withRouter(ResetPassword);
