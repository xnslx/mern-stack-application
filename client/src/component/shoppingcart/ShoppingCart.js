import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {getProductShoppingCart,removeProductFromShoppingCart,addProductToFavList,removeProductFromFavList} from '../../action/action';
import axios from 'axios';
import classes from './ShoppingCart.module.css';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar as fasStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import PayPal from '../ui/paypal/PayPal';

const ShoppingCart = (props) => {
    const [shoppingCartItem, setShoppingCartItem] = useState([]);
    const [like, setLike] = useState(false);
    const likedProducts= props.favoriteList;
    let resultData;

    useEffect(() => {
        axios.get('/products/shoppingcart').then(result => {
            console.log(result)
            setShoppingCartItem(result.data)
        }).catch(err => {
            console.log(err)
        })
    },[props.shoppingCart.length])

    console.log('shoppingCartItem', shoppingCartItem);
    let total = 0;
    shoppingCartItem.forEach(i => {
        total += i.productId.price * i.quantity
    })
    const removeProductHandler = (e,productId) => {
        e.preventDefault()
        props.dispatch(removeProductFromShoppingCart(productId));
    }

    const toggleFavListHandler = (e, productId) => {
        if(props.auth.isAuthenticated) {
            if(likedProducts.includes(productId)) {
            e.preventDefault()
            props.dispatch(removeProductFromFavList(productId))
            setLike(prev => ({
                ...prev,
                [productId]: false
            }))
        } else {
            e.preventDefault()
            props.dispatch(addProductToFavList(productId))
            setLike(prev => ({
                ...prev,
                [productId]: true
            }))
        }
        } else {
            props.history.push('/login')
        }        
    }
    if(props.shoppingCart.length === 0) {
        resultData = (
            <p style={{width:'80vw', textAlign:'center'}}>Start adding some products to the shopping cart!</p>
        )
    } else {
        resultData = (
            <div className={classes.Container}>
                {shoppingCartItem.map(product => (
                    <ul key={product._id} className={classes.List}>
                        <Link to={'/' + product.productId._id}><img src={product.productId.image} alt="" style={{width: '160px', height: 'auto'}}/></Link>
                        <li>{product.productId.name}</li>
                        <li>$ {product.productId.price}</li>
                        <button className={classes.Button} onClick={(e) =>toggleFavListHandler(e, product.productId._id)} >{likedProducts.includes(product.productId._id)? <FontAwesomeIcon icon={fasStar} /> : <FontAwesomeIcon icon={farStar} />}                            
                            </button>
                        <button onClick={(e) => removeProductHandler(e,product.productId._id)}>Remove From Shopping Cart</button>                   
                    </ul>
                ))}
                <p>Total Price: ${total}</p>
                <Link to='/checkout'><button>PROCEED TO CHECKOUT</button></Link>
                {/* <PayPal payvalue={total}/> */}
            </div>
        )
    }
    return (
        <div style={{marginTop:'80px'}}>
            {resultData}
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

export default withRouter(connect(mapStateToProps)(ShoppingCart));
