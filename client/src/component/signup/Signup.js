import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const newUser = {
        name:name,
        email:email,
        password:password
    }

    const postUserInfo = (userInfo) => {
        axios.post('http://localhost:3001/signup', {newUser}).then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        postUserInfo()
    },[]);

    const submitHandler = (e) => {
        e.preventDefault();
        postUserInfo()
    }
    return (
        <div>
            <Link to='/' >BACK TO HOME</Link>
            <h3>Sign up below</h3>
            <h5>Already have an account? <Link to='/login'>Log in</Link></h5>
            <br/>
            <br/>
            <div>
                <form action="" onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="text"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            type="text"
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

export default Signup;
