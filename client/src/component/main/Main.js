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
    const [showData, setShowData] = useState('')

    const showDetailHandler = () => {
        props.history.push('/favoritelist')
    }

    
    
    return (
        <nav className={classes.Nav}>
            {/* <Nav /> */}
            <ul className={classes.Container}>
                <li className={classes.List}>
                    <FontAwesomeIcon icon={['far', 'user']}/>
                    <span>{props.auth.user.userName? props.auth.user.userName.split(" ")[0] : ''}</span>
                </li>
                <li className={classes.List}>
                    <FontAwesomeIcon icon={['fas', 'cart-plus']} />
                </li>
                <li className={classes.List}>
                    <FontAwesomeIcon icon={['far', 'heart']} onClick={showDetailHandler}/>
                    <span>{props.favoriteList.length>0? props.favoriteList.length: ''}</span>
                </li>
            </ul>
            <Products/>
        </nav>
    )
};

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        auth: state.auth,
        error: state.error.message,
        favoriteList:state.favoriteList.favoriteList
    }
}

export default withRouter(connect(mapStateToProps)(Main));
