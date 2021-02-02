import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {resetPassword} from '../../action/action';
import classes from './ResetPassword.module.css';

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
    
    const resetPasswordHandler = (e) => {
        e.preventDefault();
        props.dispatch(resetPassword({password: password, confirmPassword: confirmPassword, passwordToken: token},props.history))
    }


    return (
        <div className={classes.Container}>
        {error.length > 0? <ul>{error.map((err,index) => <li key={index}>{err.msg}</li>)}</ul> : null}
            <form action="" onSubmit={resetPasswordHandler}>
                <div>
                    <p className={classes.LabelContainer}><label htmlFor="password" className={classes.Label}>Password</label></p>
                    <input 
                        type="password" 
                        id="password"
                        value={password}
                        className={classes.Input}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <p className={classes.LabelContainer}><label htmlFor="confirmPassword" className={classes.Label}>Confirm Password</label></p>
                    <input 
                        type="password" 
                        id="confirmPassword"
                        value={confirmPassword}
                        className={classes.Input}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className={classes.Button}>Submit</button>
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
