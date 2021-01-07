import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router';

const OrderSummary = () => {
    const [order, setOrder] = useState('');

    useEffect(() => {
        axios.get('/products/checkout/success').then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err)
        })
    },[])
    return (
        <div>
            
        </div>
    )
};

export default withRouter(OrderSummary);
