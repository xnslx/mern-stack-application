import React from 'react';
// import { Link } from 'react-router-dom';
// import Signup from '../signup/Signup';
// import Login from '../login/Login';
import Products from '../products/Products';
import classes from './Main.module.css';
// import ProductDetail from '../products/ProductDetail';
// import {Switch, Route} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from '../nav/Nav';

const Main = () => {
    return (
        <nav className={classes.Nav}>
            <Nav />
            <ul className={classes.Container}>
                <li className={classes.List}>
                    <FontAwesomeIcon icon={['far', 'user']}/>
                </li>
                <li className={classes.List}>
                    <FontAwesomeIcon icon={['fas', 'cart-plus']} />
                </li>
                <li className={classes.List}>
                    <FontAwesomeIcon icon={['far', 'heart']}/>
                </li>
            </ul>
            <Products/>
        </nav>
    )
};

export default Main;
