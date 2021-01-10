import React, {useState, useEffect} from 'react';
import axios from 'axios';
import setAuthToken from '../../middleware/middleware';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { loginUser,getProductFavList} from '../../action/action';
import Dashboard from '../dashboard/Dashboard';
import {SET_CURRENT_USER} from '../../action/type';
import Form from 'react-bootstrap/Form';
import classes from './Login.module.css';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});

    const currentUser = {
        email: email,
        password: password
    }


    useEffect(() => {
        getErrorMessage()
    }, [props.error])

    const getErrorMessage = () => {
        if(props.error !== null) {
        setError(props.error.errors);
        }
    }

    console.log('error', error)

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        props.dispatch(loginUser(currentUser, props.history));
    }

    return (
        <div className={classes.Container}>
            <Link to='/' >X</Link>
            <h1 style={{textAlign:'center'}}>Log In</h1>
            {/* <h5>Don't have an account? <Link to='/signup'>Sign up</Link></h5> */}
            <br/>
            <br/>
            {error.length > 0? <ul>{error.map((err,index) => <li key={index}>{err.msg}</li>)}</ul> : null}
            <div className={classes.Form}>
                <form action="" onSubmit={loginSubmitHandler}>
                    <div>
                        <p><label htmlFor="email">Email</label></p>
                        <input 
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <p><label htmlFor="password">Password</label></p>
                        <input 
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">LOG IN</button>
                </form>
            </div>
            <a href="/findpassword">Forget Password?</a>
            <h5>Don't have an account? <Link to='/signup'>Sign up</Link></h5>
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
