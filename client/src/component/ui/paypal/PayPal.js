import React, {useEffect, useState} from 'react';
import {savePayment, onSuccessBuy} from '../../../action/action';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import classes from './PayPal.module.css';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });


const PayPal = (props) => {
  console.log('paypal', props)
  const shippingInfo = props.order.shippingInfo;
  const [paySuccess, setPaySuccess] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userToken, setUserToken] = useState('')

  // useEffect(() => {
  //       if(props.isUserLogin.user) {
  //           setUserToken(props.isUserLogin.user.token)
  //       }
  //   },[])

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

    const token = props.isUserLogin.user.token;

    const onApprove = (data, actions) => {
      console.log(data)
      console.log(actions)
        return actions.order.capture().then(result => {
          props.dispatch(savePayment(result))
          console.log(result)
          props.dispatch(onSuccessBuy(result, shippingInfo, token))
          setPaySuccess(true)
        }).catch(err =>{
          console.log(err)
        });
    };

    const reviewOrderHandler = () => {
        if(props.order) {
          props.history.push(`/products/order/${props.order.order._id}`)
        }
    }

    console.log('props.order.order._id',props.order.order._id)
    
    let paymentResult;
    if(paySuccess) {
      paymentResult=(
        <>
            <p><span>Successfully buy!</span></p>
            <button onClick={reviewOrderHandler} className={classes.Button}>Review your order</button>
        </>
      )
    } else {
      paymentResult=''
    }

    return (
      <>
        <p className={classes.Price}>The total value of your order <strong>${props.payvalue}</strong></p>
        <br/>
        <h2>Place your order</h2>
        <PayPalButton
          className ={classes.Container}
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
        {paymentResult}
      </>
  );
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

export default withRouter(connect(mapStateToProps)(PayPal));