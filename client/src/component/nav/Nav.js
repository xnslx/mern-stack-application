import React from 'react';
import Signup from '../signup/Signup';
import Login from '../login/Login';
import { Link } from 'react-router-dom';
import {bubble as Menu} from 'react-burger-menu';
import classes from './Nav.module.css';
import {connect} from 'react-redux';
import {logoutUser} from '../../action/action';
import {withRouter} from 'react-router';


const Nav = (props) => {
    // console.log('props',props)
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
    }
    return (
        <Menu styles={styles}>
            <ul className={classes.List}>
                <li className={classes.ListItem}>Shop</li>
                <li className={classes.ListItem}>Contact</li>
                <li className={classes.ListItem}>About</li>
                {props.auth.isAuthenticated? stateButton=(<button className={classes.Button} onClick={logoutHandler}>LOG OUT</button>) : stateButton=(<Link to='/login' ><button className={classes.Button}>LOG IN</button></Link>)}
                <Link to='/signup' ><button className={classes.Button}>SIGN UP</button></Link>
            </ul>
        </Menu>
    )
};

const mapStateToProps = (state) => {
    // console.log('state', state)
    return {
        auth: state.auth,
        error: state.error.message
    }
}

export default connect(mapStateToProps)(withRouter(Nav));
