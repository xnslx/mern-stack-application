import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

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
            <p>This is the review of your order!</p>
            <p>Order number:{order._id}</p>
            <p>Product details:</p>
            {products? <div>
                {products.map(product => (
                    <ul key={product._id}>
                        <li>{product.product.name}</li>
                        <li>${product.product.price}</li>
                        <li>{product.product.quantity}</li>
                    </ul>
                ))}
            </div>:''}
            <p>Shipping Detail:</p>
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
