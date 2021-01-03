import React, {useState, useEffect} from 'react';
import PayPal from '../ui/paypal/PayPal';
import {withRouter} from 'react-router';
import axios from 'axios';

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
        <div>
            <p>The total price is ${total}</p>
            <PayPal payvalue={total}/>
        </div>
    )
};

export default withRouter(Checkout);
