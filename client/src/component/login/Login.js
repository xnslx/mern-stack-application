import React, {useState, useEffect} from 'react';
import axios from 'axios';
import setAuthToken from '../../middleware/middleware';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { loginUser } from '../../action/action';
import Dashboard from '../dashboard/Dashboard';
import {SET_CURRENT_USER} from '../../action/type';


const Login = (props) => {
    // console.log('props', props)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const currentUser = {
        email: email,
        password: password
    }

    // useEffect(() => {
    //     if(props.auth.isAuthenticated) {
    //         props.history.push('/dashboard')
    //     }
    // }, []);

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        props.dispatch(loginUser(currentUser, props.history));
    }

    return (
        <div>
            <Link to='/' >BACK TO HOME</Link>
            <h3>Log in below</h3>
            <h5>Don't have an account? <Link to='/signup'>Sign up</Link></h5>
            <br/>
            <br/>
            <div>
                <form action="" onSubmit={loginSubmitHandler}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
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
        </div>
    )
};

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps)(withRouter(Login));
