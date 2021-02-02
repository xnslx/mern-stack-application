import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {retrievePassword} from '../../action/action';
import {Link} from 'react-router-dom';
import classes from './FindPassword.module.css';

const FindPassword = (props) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState({});

    const verifiedEmail = {
        email: email
    }

    useEffect(() => {
        getErrorMessage()
    }, [props.error.message])

    const getErrorMessage = () => {
        if(props.error !== null) {
        setError(props.error);
        }
    }

    console.log('error', error)

    const findPasswordHandler = (e) => {
        e.preventDefault();
        props.dispatch(retrievePassword(verifiedEmail));
        setEmail('')
    }


    return (
        <div>
        <Link to='/' className={classes.Link} >BACK TO HOME</Link>
        {props.error.hasError === true && (
            <div>
                <p>{error.message}</p>
            </div>
        )}
        {props.backendData === 'Email sent!' && (
            <div className={classes.TextContainer}>
                <p>Please check your email to reset password!</p>
            </div>
        )}
        <p className={classes.Text}>Type your email to reset the password.</p>
            <form action="" onSubmit={findPasswordHandler} className={classes.Container}>
                <p className={classes.LabelContainer} ><label htmlFor="email" className={classes.Label}>Email</label></p>
                <input 
                    type="email"
                    id="email"
                    className={classes.Input}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button type="submit" className={classes.Button}>Submit</button>
            </form>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        isUserLogin:state.isUserLogin,
        auth: state.auth,
        error: state.error,
        backendData: state.backendData.backendData
    }
}

export default connect(mapStateToProps)(FindPassword);
