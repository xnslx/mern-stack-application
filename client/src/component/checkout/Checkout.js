import React, {useState, useEffect} from 'react';
import PayPal from '../ui/paypal/PayPal';
import ShippingInfo from '../shippingInfo/ShippingInfo';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import axios from 'axios';
import classes from './Checkout.module.css';

const Checkout = (props) => {
    const [total, setTotal ] = useState('');
    
    useEffect(() => {
        axios.get('/products/checkout',{
            headers: {
                Authorization: `Bearer ${props.isUserLogin.user.token}`
            }
        }).then(result => {
            console.log(result)
            setTotal(result.data.result)
        })
        .catch(err => {
            console.log(err)
        })
    },[])


    return (
        <div className={classes.Container}>
            <p>The total price is ${total}</p>
            <ShippingInfo />
            {/* <PayPal payvalue={total}/> */}
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
        shoppingCart:state.shoppingCart.shoppingCart
    }
}

export default withRouter(connect(mapStateToProps)(Checkout));
