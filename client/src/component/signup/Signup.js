import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { signupUser,getErrorMessage } from '../../action/action';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { Link } from 'react-router-dom';

const Signup = (props) => {
    // console.log('props', props)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({})


    const newUser = {
        name:name,
        email:email,
        password:password,
        confirmPassword:confirmPassword
    }

    useEffect(() => {
        getErrorMessage()
    }, [props.error])

    const getErrorMessage = () => {
        if(props.error !== null) {
        setError(props.error.errors)
        }
    }

    console.log('error', error)
        
    const submitHandler = (e) => {
        e.preventDefault();
        props.dispatch(signupUser(newUser, props.history))
    }

    let errorMessage;
    if(error.length >0) {
        error.forEach(err => (errorMessage =
            <ul>
                <li>{err.msg}</li>
            </ul>
        ))
    } else {
        errorMessage = ''
    }


    return (
        <div>
            <Link to='/' >BACK TO HOME</Link>
            <h3>Sign up below</h3>
            <h5>Already have an account? <Link to='/login'>Log in</Link></h5>
            <br/>
            {errorMessage}
            <div>
                <form action="" onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text"
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
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
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">SIGN UP</button>
                </form>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    // console.log('state', state)
    return {
        auth: state.auth,
        error: state.error
    }
}
export default connect(mapStateToProps)(withRouter(Signup));


