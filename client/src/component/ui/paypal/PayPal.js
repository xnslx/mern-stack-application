import React, {useEffect, useState} from 'react';
import {savePayment, onSuccessBuy} from '../../../action/action';
import classes from './PayPal.module.css';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
import axios from 'axios';
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });


const PayPal = (props) => {
  console.log('paypal', props)
  const shippingInfo = props.order.shippingInfo;
  const [paySuccess, setPaySuccess] = useState(false)


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
          props.dispatch(savePayment(result))
          console.log(result)
          props.dispatch(onSuccessBuy(result, shippingInfo))
          setPaySuccess(true)
        }).catch(err =>{
          console.log(err)
        });
    };

    
    const orderId = props.order.order._id;
    if(paySuccess) {
      props.history.push('/checkout/:orderId')
    }

    return (
      <>
        <p>The total value of your order <strong>${props.payvalue}</strong></p>
        <br/>
        <h2>Place your order</h2>
        <PayPalButton
          className ={classes.Container}
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </>
  );
};

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        auth: state.auth,
        error: state.error.message,
        favoriteList:state.favoriteList.favoriteList,
        shoppingCart:state.shoppingCart.shoppingCart,
        order:state.order
    }
}

export default connect(mapStateToProps)(PayPal);