import React, {useState} from 'react';
import classes from './Main.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from '../nav/Nav';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import logo from '../../assets/profile.png';

const Main = (props) => {

    const [menuOpen, setMenuOpen] = useState(false)

    const showFavDetailHandler = () => {
        if(props.isUserLogin.user) {
            props.history.push('/favoritelist')
        } else {
            props.history.push('/login')
        }
    }

    const showCartHandler = () => {
        if(props.isUserLogin.user) {
            props.history.push('/shoppingcart')
        } else {
            props.history.push('/login')
        }
    }

    const showOrderHistoryHandler = () => {
        if(props.isUserLogin.user) {
            props.history.push('/orderhistory')
        } else {
            props.history.push('/login')
        }
    }

    
    return (
        <nav className={classes.Nav}>
            <Nav/>
            <ul className={classes.Container}>
                <Link to='/'><img src={logo} style={{width:'48px', height:'auto'}} className={classes.Logo}/></Link>
                <li className={classes.List}>
                    <FontAwesomeIcon icon={['far', 'user']} onClick={showOrderHistoryHandler}/>
                    <span>{props.isUserLogin.user? props.isUserLogin.user.user.name.split(' ')[0]: ''}</span>
                </li>
                <li className={classes.List}>
                    <FontAwesomeIcon icon={['fas', 'cart-plus']} onClick={showCartHandler}/>
                    <span>{props.isUserLogin.user? props.shoppingCart.length: ''}</span>
                </li>
                <li className={classes.List}>
                    <FontAwesomeIcon icon={['far', 'heart']} onClick={showFavDetailHandler}/>
                    <span>{props.isUserLogin.user? props.favoriteList.length: ''}</span>
                </li>
            </ul>
        </nav>
    )
};

const mapStateToProps = (state) => {
    return {
        isUserLogin:state.isUserLogin,
        auth: state.auth,
        error: state.error.message,
        favoriteList:state.favoriteList.favoriteList,
        shoppingCart:state.shoppingCart.shoppingCart
    }
}

export default withRouter(connect(mapStateToProps)(Main));
