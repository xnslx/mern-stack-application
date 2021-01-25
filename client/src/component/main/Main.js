import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
// import Signup from '../signup/Signup';
// import Login from '../login/Login';
import Products from '../products/Products';
import classes from './Main.module.css';
// import ProductDetail from '../products/ProductDetail';
// import {Switch, Route} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from '../nav/Nav';
import favoriteList from '../favlistdetail/FavListDetail';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {getProductFavList} from '../../action/action';

const Main = (props) => {
    const [favList, setFavList] = useState([])
    const [isMounted, setIsMounted] = useState(false);
    const [showData, setShowData] = useState('');

    const [menuOpen, setMenuOpen] = useState(false)

    const showFavDetailHandler = () => {
        if(props.auth.isAuthenticated) {
            props.history.push('/favoritelist')
        } else {
            props.history.push('/login')
        }
    }

    const showCartHandler = () => {
        if(props.auth.isAuthenticated) {
            props.history.push('/shoppingcart')
        } else {
            props.history.push('/login')
        }
    }

    const showOrderHistoryHandler = () => {
        if(props.auth.isAuthenticated) {
            props.history.push('/orderhistory')
        } else {
            props.history.push('/login')
        }
    }

    
    return (
        <nav className={classes.Nav}>
            <Nav/>
            <ul className={classes.Container}>
                <li className={classes.List}>
                    <FontAwesomeIcon icon={['far', 'user']} onClick={showOrderHistoryHandler}/>
                    <span>{props.auth.user.user? props.auth.user.user.name.split(" ")[0] : ''}</span>
                    {/* <span>{props.isUserLogin? props.isUserLogin.user.user.name.split(" ")[0]: ''}</span> */}
                </li>
                <li className={classes.List}>
                    <FontAwesomeIcon icon={['fas', 'cart-plus']} onClick={showCartHandler}/>
                    <span>{props.shoppingCart.length>0? props.shoppingCart.length: ''}</span>
                </li>
                <li className={classes.List}>
                    <FontAwesomeIcon icon={['far', 'heart']} onClick={showFavDetailHandler}/>
                    <span>{props.favoriteList.length>0? props.favoriteList.length: ''}</span>
                </li>
            </ul>
            {/* <Products/> */}
        </nav>
    )
};

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        isUserLogin:state.isUserLogin,
        auth: state.auth,
        error: state.error.message,
        favoriteList:state.favoriteList.favoriteList,
        shoppingCart:state.shoppingCart.shoppingCart
    }
}

export default withRouter(connect(mapStateToProps)(Main));
