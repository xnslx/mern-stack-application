import React from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <Link to='/' >BACK TO HOME</Link>
            <h3>Log in below</h3>
            <h5>Don't have an account? <Link to='/signup'>Sign up</Link></h5>
            <br/>
            <br/>
            <div>
                <form action="">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="text"/>
                    </div>
                    <button type="submit">LOG IN</button>
                </form>
            </div>
        </div>
    )
};

export default Login;
