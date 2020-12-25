import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getProductShoppingCart,removeProductFromShoppingCart} from '../../action/action';
import axios from 'axios';
import classes from './ShoppingCart.module.css';

const ShoppingCart = (props) => {
    const [shoppingCartItem, setShoppingCartItem] = useState([])
    useEffect(() => {
        axios.get('/products/shoppingcart').then(result => {
            console.log(result)
            setShoppingCartItem(result.data)
        }).catch(err => {
            console.log(err)
        })
    },[])

    const removeProductHandler = (e,productId) => {
        e.preventDefault()
        props.dispatch(removeProductFromShoppingCart(productId))
    }
    return (
        <div className={classes.Container}>
            {shoppingCartItem.map(product => (
                <ul key={product._id} className={classes.List}>
                    <img src={product.productId.image} alt="" style={{width: '160px', height: 'auto'}}/>
                    <li>{product.productId.name}</li>
                    <li>$ {product.productId.price}</li>
                    <button onClick={(e) => removeProductHandler(e,product.productId._id)}>Remove From Shopping Cart</button>                   
                </ul>
            ))}
        </div>
    )
};

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        auth: state.auth,
        error: state.error.message,
        favoriteList:state.favoriteList.favoriteList,
        shoppingCart:state.shoppingCart.shoppingCart
    }
}

export default connect(mapStateToProps)(ShoppingCart);
