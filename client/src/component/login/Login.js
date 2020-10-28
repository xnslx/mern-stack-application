import React, {useState, useEffect} from 'react';
import axios from 'axios';
import setAuthToken from '../../middleware/middleware';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { loginUser } from '../../action/action';
import {SET_CURRENT_USER} from '../../action/type';


const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const currentUser = {
        email: email,
        password: password
    }

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        // loginUser(currentUser)
        props.dispatch(loginUser(currentUser))
        // if(props.auth.isAuthenticated) {
        //     props.history.push('/dashboard')
        // }
        // axios.post('/login', currentUser)
        //     .then(result => {
        //         const {token} = result.data;
        //         localStorage.setItem('jwtToken', token)
        //         setAuthToken(token)
        //         console.log(result)
        // }).catch(err => {
        //     console.log(err)
        // })

    }
    const pushUserToDashboard = () => {
        if(props.auth.isAuthenticated) {
            props.history.push('/dashboard')
        }
    }

    useEffect(() => {
        pushUserToDashboard()
    }, []);

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
