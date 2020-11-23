import React from 'react';
import { Link } from 'react-router-dom';
import Signup from '../signup/Signup';
import Login from '../login/Login';
import Products from '../products/Products';
import ProductDetail from '../products/ProductDetail';
// import {Switch, Route} from 'react-router-dom';

const Main = () => {
    return (
        <div>
            {/* <p><strong>Build</strong> a login/auth app with MERN STACK</p>
            <h5>Create a minimal full-stack app with user authentication via JWT token</h5> */}
            <Link to='/signup' ><button>SIGN UP</button></Link>
            <Link to='/login' ><button>LOG IN</button></Link>
            <Products/>
            {/* <Switch>
                <Route path='/:prodId' component={ProductDetail}/>
            </Switch> */}
        </div>
    )
};

export default Main;
