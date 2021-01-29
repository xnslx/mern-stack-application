import React, {useEffect, useState} from 'react';
import PayPal from '../ui/paypal/PayPal';
import {withRouter} from 'react-router';
import classes from './Payment.module.css';
import axios from 'axios';
import {paySuccess} from '../../action/action';
import {connect} from 'react-redux';


const Payment = (props) => {
    const [total, setTotal] = useState('');
    const [userToken, setUserToken] = useState('');

    useEffect(() => {
        axios.get('/products/checkout').then(result => {
            console.log(result)
            setTotal(result.data.result)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    console.log('total', total)
    return (
        <div className={classes.Container}>
            <PayPal payvalue={total}/>
        </div>
    )
};

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        isUserLogin:state.isUserLogin,
        auth: state.auth,
        error: state.error.message,
        favoriteList:state.favoriteList.favoriteList,
        shoppingCart:state.shoppingCart.shoppingCart,
        order:state.order
    }
}

export default withRouter(connect(mapStateToProps)(Payment))
