import React from 'react';
import PayPal from '../ui/paypal/PayPal';
import {withRouter} from 'react-router';
import classes from './Payment.module.css';

const Payment = () => {
    return (
        <div className={classes.Container}>
            <PayPal />
        </div>
    )
};

export default withRouter(Payment);
