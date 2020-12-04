import React from 'react';
import Signup from '../signup/Signup';
import Login from '../login/Login';
import { Link } from 'react-router-dom';
import {bubble as Menu} from 'react-burger-menu';
import classes from './Nav.module.css';


const Nav = () => {
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
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
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
    return (
        <Menu styles={styles}>
            <ul>
                <li>Shop</li>
                <li>Contact</li>
                <Link to='/signup' ><button>SIGN UP</button></Link>
                <Link to='/login' ><button>LOG IN</button></Link>
            </ul>
        </Menu>
    )
};

export default Nav;
