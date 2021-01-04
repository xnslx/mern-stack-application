import React, {useState, useEffect} from 'react';
import PayPal from '../ui/paypal/PayPal';
import ShippingInfo from '../shippingInfo/ShippingInfo';
import {withRouter} from 'react-router';
import axios from 'axios';
import classes from './Checkout.module.css';

const Checkout = () => {
    const [total, setTotal ] = useState('');
    useEffect(() => {
        axios.get('/products/checkout').then(result => {
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

export default withRouter(Checkout);
