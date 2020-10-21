import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../main/Main';

const Signup = () => {
    return (
        <div>
            <Link to='/' >BACK TO HOME</Link>
            <h3>Sign up below</h3>
            <h5>Already have an account? <Link>Log in</Link></h5>
            <br/>
            <br/>
            <div>
                <form action="">
                    <div>
                        <label for="name">Name</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="text"/>
                    </div>
                    <button type="submit">SIGN UP</button>
                </form>
            </div>
        </div>
    )
};

export default Signup;
