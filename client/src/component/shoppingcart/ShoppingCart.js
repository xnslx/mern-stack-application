import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getProductShoppingCart,removeProductFromShoppingCart,addProductToFavList,removeProductFromFavList} from '../../action/action';
import axios from 'axios';
import classes from './ShoppingCart.module.css';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar as fasStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons';

const ShoppingCart = (props) => {
    const [shoppingCartItem, setShoppingCartItem] = useState([]);
    const [like, setLike] = useState(false);
    const likedProducts= props.favoriteList;
    let resultData;
    

    useEffect(() => {
        axios.get('/products/shoppingcart', {
            headers: {
                Authorization: `Bearer ${props.isUserLogin.user.token}`
            }
        }).then(result => {
            setShoppingCartItem(result.data)
        }).catch(err => {
            console.log(err)
        })
    },[props.shoppingCart.length])

    const token = props.isUserLogin.user.token;

    let total = 0;
    shoppingCartItem.forEach(i => {
        total += i.productId.price * i.quantity
    })
    const removeProductHandler = (e,productId) => {
        e.preventDefault()
        props.dispatch(removeProductFromShoppingCart(productId,token));
    }

    const processToCheckoutHandler = () => {
        props.history.push('/checkout')
    }


    const toggleFavListHandler = (e, productId) => {
        if(props.isUserLogin.user) {
            if(likedProducts.includes(productId)) {
            e.preventDefault()
            props.dispatch(removeProductFromFavList(productId,token))
            setLike(prev => ({
                ...prev,
                [productId]: false
            }))
        } else {
            e.preventDefault()
            props.dispatch(addProductToFavList(productId,token))
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
            <p style={{width:'80vw', textAlign:'center', marginRight:'auto', marginLeft:'auto'}}>Start adding some products to the shopping cart!</p>
        )
    } else {
        resultData = (
            <div className={classes.Container}>
                {shoppingCartItem.map(product => (
                    <ul key={product._id} className={classes.List}>
                        <Link to={'/' + product.productId._id}><img src={product.productId.image} alt="" className={classes.Image}/></Link>
                        <li>{product.productId.name}</li>
                        <li>$ {product.productId.price}</li>
                        <button className={classes.Button} onClick={(e) =>toggleFavListHandler(e, product.productId._id)} >{likedProducts.includes(product.productId._id)? <FontAwesomeIcon icon={fasStar} /> : <FontAwesomeIcon icon={farStar} />}                            
                        </button>
                        <button onClick={(e) => removeProductHandler(e,product.productId._id)} className={classes.ShoppingCartButton}>Remove From Shopping Cart</button>                   
                    </ul>
                ))}
                <button onClick={processToCheckoutHandler} className={classes.CheckoutButton}>PROCEED TO CHECKOUT ${total}</button>
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
    return {
        isUserLogin:state.isUserLogin,
        auth: state.auth,
        error: state.error.message,
        favoriteList:state.favoriteList.favoriteList,
        shoppingCart:state.shoppingCart.shoppingCart
    }
}

export default withRouter(connect(mapStateToProps)(ShoppingCart));
