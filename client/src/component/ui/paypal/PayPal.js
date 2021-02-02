import React, {useState} from 'react';
import {savePayment, onSuccessBuy} from '../../../action/action';
import {withRouter} from 'react-router';
import classes from './PayPal.module.css';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });


const PayPal = (props) => {
  const shippingInfo = props.order.shippingInfo;
  const [paySuccess, setPaySuccess] = useState(false);

    const createOrder = (data, actions) => {
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
        return actions.order.capture().then(result => {
          props.dispatch(savePayment(result))
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