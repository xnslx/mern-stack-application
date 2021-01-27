import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import axios from 'axios';
import {removeProductFromFavList,getProductFavList,removeProductFromShoppingCart} from '../../action/action';
import classes from './FavListDetail.module.css';
import {addProductToShoppingCart} from '../../action/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {Link} from 'react-router-dom';


const FavListDetail = (props) => {
    console.log('props',props)
    const [favList, setFavList] = useState([]);
    const shoppingCartItems = props.shoppingCart;
    useEffect(() => {
        axios.get('/products/favoritelist', {
            headers: {
                Authorization: `Bearer ${props.isUserLogin.user.token}`
            }
        }).then(result => {
            console.log(result.data)
            setFavList(result.data)
        }).catch(err => {
            console.log(err)
        })
    },[props.favoriteList.length])

    const token = props.isUserLogin.user.token


    const removeProductHandler = (e,productId) => {
        console.log(productId)
        props.dispatch(removeProductFromFavList(productId))
    }

    const addToCartHandler = (e,productId) => {
        e.preventDefault()
        props.dispatch(addProductToShoppingCart(productId,token))
    }

    const removeFromCartHandler = (e, productId) => {
        e.preventDefault();
        props.dispatch(removeProductFromShoppingCart(productId,token))
    }
    return (
        <div className={classes.Container}>
            {favList.map(product => (
                <ul key={product._id} className={classes.List}>
                    <Link to={'/' + product.productId._id}><img src={product.productId.image} alt="" style={{width: '160px', height: 'auto'}}/></Link>
                    <li>{product.productId.name}</li>
                    <li>$ {product.productId.price}</li>
                    <li>stock: {product.productId.stock}</li>
                    {/* <button onClick={(e) =>removeProductHandler(e, product.productId._id)}>Remove</button> */}
                    <FontAwesomeIcon icon={faTrashAlt} onClick={(e) =>removeProductHandler(e, product.productId._id)} className={classes.Button}/>
                    {/* <button onClick={(e) =>addToCartHandler(e, product.productId._id)}>Add to shopping cart</button> */}
                    {shoppingCartItems.includes(product.productId._id) ? <button onClick={(e) => removeFromCartHandler(e, product.productId._id)} className={classes.FavListButton} disabled={product.productId.stock ===0}>Remove product from shopping cart</button> :<button onClick={(e) => addToCartHandler(e,product.productId._id)} className={classes.FavListButton} disabled={product.productId.stock ===0}>Add to cart</button>}
                </ul>
            ))}
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
        shoppingCart:state.shoppingCart.shoppingCart
    }
}

export default connect(mapStateToProps)(FavListDetail);
