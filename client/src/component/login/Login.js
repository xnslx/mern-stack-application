import React, {useState} from 'react';
import axios from 'axios';
import setAuthToken from '../../middleware/middleware';
import {Link} from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const currentUser = {
        email: email,
        password: password
    }

    const loginSubmitHandler = (e, userInfo) => {
        e.preventDefault()
        axios.post('/login', currentUser)
            .then(result => {
                const {token} = result.data;
                localStorage.setItem('jwtToken', token)
                setAuthToken(token)
                console.log(result)
        }).catch(err => {
            console.log(err)
        })
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

export default Login;
