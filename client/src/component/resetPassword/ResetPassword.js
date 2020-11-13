import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';

const ResetPassword = (props) => {
    console.log('props', props)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const token = props.match.params.token;
    // useEffect(() => {
    //     axios.get(`/updatepassword/${token}`).then(result => {
    //         console.log('result',result)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // },[])
    return (
        <div>
            <form action="">
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
