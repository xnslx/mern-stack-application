import React from 'react';
import { Link } from 'react-router-dom';
import Signup from '../signup/Signup';

const Main = () => {
    return (
        <div>
            <main>
                <p><strong>Build</strong> a login/auth app with MERN STACK</p>
                <h5>Create a minimal full-stack app with user authentication via JWT token</h5>
                <Link to='/signup'><button>SIGN UP</button></Link>
                <button>LOG IN</button>
            </main>
        </div>
    )
};

export default Main;
