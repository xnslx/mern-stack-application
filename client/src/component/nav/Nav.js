import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {bubble as Menu} from 'react-burger-menu';
import classes from './Nav.module.css';
import {connect} from 'react-redux';
import {logoutUser,emptyProductFavList,emptyProductShoppingCart} from '../../action/action';
import {withRouter} from 'react-router';


const Nav = (props) => {
    const [isMenuOpen, handleMenu] = useState(false)
    
    
    var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '16px',
    height: '16px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    background: '#fafafa',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    width:'100%'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}


let stateButton;

const logoutHandler = () => {
        props.dispatch(logoutUser(props.history))
        props.dispatch(emptyProductFavList(props.auth.user.userId));
        props.dispatch(emptyProductShoppingCart(props.auth.user.userId));
        handleCloseMenu()
    }

    const handleCloseMenu = () => {
        handleMenu(false)
    }

    const handleStateChange = (state) => {
        handleMenu(state.isOpen)
    }
    
    return (
        <Menu styles={styles} isOpen={isMenuOpen} onStateChange={handleStateChange}>
            <ul className={classes.List}>
                <li className={classes.ListItem}>Shop</li>
                <li className={classes.ListItem}>Contact</li>
                <li className={classes.ListItem}>About</li>
            </ul>
            {props.isUserLogin.user? stateButton=(<button className={classes.Button} onClick={logoutHandler}>LOG OUT</button>) : stateButton=(<Link to='/login' className={classes.Alink}><button className={classes.Button} onClick={() => handleCloseMenu()}>LOG IN</button></Link>)}
                <Link to='/signup' className={classes.Alink}><button className={classes.SignupButton}>SIGN UP</button></Link>
        </Menu>
    )
};

const mapStateToProps = (state) => {
    return {
        isUserLogin:state.isUserLogin,
        auth: state.auth,
        error: state.error.message
    }
}

export default connect(mapStateToProps)(withRouter(Nav));
