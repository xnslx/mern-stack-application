import React from 'react';
import { Link } from 'react-router-dom';
import Signup from '../signup/Signup';
import Login from '../login/Login';
import Products from '../products/Products';

const Main = () => {
    return (
        <div>
                {/* <p><strong>Build</strong> a login/auth app with MERN STACK</p>
                <h5>Create a minimal full-stack app with user authentication via JWT token</h5> */}
                <Link to='/signup' ><button>SIGN UP</button></Link>
                <Link to='/login' ><button>LOG IN</button></Link>
                <Products/>
        </div>
    )
};

export default Main;
