import React, {useEffect, useState} from 'react';
import PayPal from '../ui/paypal/PayPal';
import {withRouter} from 'react-router';
import classes from './Payment.module.css';
import axios from 'axios';

const Payment = () => {
    const [total, setTotal] = useState('');

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

export default withRouter(Payment);
