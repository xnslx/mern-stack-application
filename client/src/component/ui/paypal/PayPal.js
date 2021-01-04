import React from 'react';
import classes from './PayPal.module.css';
import ReactDOM from "react-dom";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });


const PayPal = (props) => {
  console.log('paypal', props)
    const createOrder = (data, actions) => {
      console.log(data)
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: props.payvalue,
                },
            }, ],
        });
    };

    const onApprove = (data, actions) => {
      console.log(data)
      console.log(actions)
        return actions.order.capture().then(result => {
          console.log(result)
        });
    };
    
    return (
      <PayPalButton
        className ={classes.Container}
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
  );
};

export default PayPal;