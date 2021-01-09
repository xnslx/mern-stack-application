import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import classes from './OrderSummary.module.css';

const OrderSummary = (props) => {
    console.log('props',props)
    const [order, setOrder] = useState({});

    useEffect(() => {
        axios.get('/products/order/'+ props.match.params.orderId).then(result => {
            console.log('result',result)
            setOrder(result.data)
        }).catch(err => {
            console.log(err)
        })
    },[])

    console.log('order', order)
    console.log('props.match.params.orderId',props.match.params.orderId)
    let resultData;
    const {payment, products, shippingInfo, user} = order;
    console.log('products',products)
    
    return (
        <div>
            <h3><strong>Order:{order._id}</strong></h3>
            <br/>
            <h4>Product details:</h4>
            {products? <div className={classes.Container}>
                {products.map(product => (
                    <ul key={product._id}>
                        <img src={product.product.image} alt="" />
                        <li>{product.product.name}</li>
                        <li>${product.product.price}</li>
                        <li>{product.quantity}</li>
                        <hr />
                    </ul>
                ))}
            </div>:''}
            <h4>Shipping Detail:</h4>
            {shippingInfo? <ul>
                     <li>{order.shippingInfo.address}</li>
                     <li>{order.shippingInfo.city}</li>
                     <li>{order.shippingInfo.state}</li>
                     <li>{order.shippingInfo.zipcode}</li>
                 </ul> : ''}
        </div>
    )
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

export default withRouter(connect(mapStateToProps)(OrderSummary));
