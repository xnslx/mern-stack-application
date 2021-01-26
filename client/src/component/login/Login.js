import React, {useState, useEffect} from 'react';
import axios from 'axios';
import setAuthToken from '../../middleware/middleware';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { loginUser,getProductFavList,getErrorMessage} from '../../action/action';
import Dashboard from '../dashboard/Dashboard';
import {SET_CURRENT_USER} from '../../action/type';
import Form from 'react-bootstrap/Form';
import classes from './Login.module.css';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState([]);
    const [hasError, setHasError] = useState(false)

    const currentUser = {
        email: email,
        password: password
    }


    useEffect(() => {
        getErrorMessage()
    }, [props.error])

    const getErrorMessage = () => {
        if(props.error !== null) {
        setError(props.error.message);
        }
    }

    // console.log('error', error)
    // console.log('props.error', props.error)

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        props.dispatch(loginUser(currentUser, props.history));
    }
    
    return (
        <div className={classes.Container}>
            <Link to='/' className={classes.Link}>X</Link>
            <h1 style={{textAlign:'center'}}>Log In</h1>
            <br/>
            <br/>
            {error.length > 0? <p className={classes.ErrorMessage}>{error}</p> : null}
            <div className={classes.Form}>
                <form action="" onSubmit={loginSubmitHandler}>
                    <div>
                        <p className={classes.LabelContainer}><label htmlFor="email" className={classes.Label}>Email</label></p>
                        <input 
                            type="email"
                            id="email"
                            className={classes.Input}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className={classes.LabelContainer}><label htmlFor="password" className={classes.Label}>Password</label></p>
                        <input 
                            type="password"
                            id="password"
                            className={classes.Input}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={classes.Button}>LOG IN</button>
                </form>
            </div>
            <a href="/findpassword" className={classes.Alink}>Forget Password?</a>
            <h5>Don't have an account? <Link to='/signup' className={classes.Alink}>Sign up</Link></h5>
        </div>
    )
};

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        auth: state.auth,
        error: state.error.message
    }
}


export default connect(mapStateToProps)(withRouter(Login));
