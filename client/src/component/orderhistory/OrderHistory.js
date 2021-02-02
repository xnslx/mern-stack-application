import React,{useState, useEffect} from 'react';
import axios from 'axios';
import classes from './OrderHistory.module.css';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

const OrderHistory = (props) => {
    console.log('props',props)
    const [order, setOrder] = useState([]);

    useEffect(() => {
        axios.get('/products/order/'+ props.isUserLogin.user.user.userId, {
            headers: {
                Authorization: `Bearer ${props.isUserLogin.user.token}`
            }
        }).then(result => {
            setOrder(result.data)
        }).catch(err => {
            console.log(err)
        })
    },[props.isUserLogin.user.token,props.isUserLogin.user.user.userId])

    console.log('order', order)
    return (
        <div className={classes.TopContainer}>
            {
                order? 
                <div className={classes.SubContainer}>
                    {order.map(or => (
                        <div key={or._id}>
                            <p className={classes.Order}>order: <strong>{or._id}</strong></p>
                            <div className={classes.ProductsContainer}>{or.products.map(prd => (
                                <ul key={prd._id} className={classes.ListContainer}>
                                    <img src={prd.product.image} alt=""  className={classes.Image}/>
                                    <li className={classes.List}>{prd.product.name}</li>
                                    <li className={classes.List}>${prd.product.price}</li>
                                    <li className={classes.List}>{prd.product.quantity}</li>
                                </ul>
                            ))}</div>
                            <div className={classes.ShipContainer}>
                                <ul key={or.index} className={classes.ListContainer}>
                                    <li className={classes.List}>{or.shippingInfo.address}</li>
                                    <li className={classes.List}>{or.shippingInfo.city}</li>
                                    <li className={classes.List}>{or.shippingInfo.state}</li>
                                    <li className={classes.List}>{or.shippingInfo.zipcode}</li>
                                </ul>
                            </div>
                            <hr/>
                        </div>
                    ))}
                </div> : ''
            }
        </div>
    )
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

export default withRouter(connect(mapStateToProps)(OrderHistory));
