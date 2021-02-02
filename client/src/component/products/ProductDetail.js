import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router';
import classes from './ProductDetail.module.css';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar as fasStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import {addProductToFavList,removeProductFromFavList} from '../../action/action';
import {addProductToShoppingCart,removeProductFromShoppingCart} from '../../action/action';

const ProductDetail = (props) => {
    const [productDetail, setProductDetail] = useState([]);
    const shoppingCartItems = props.shoppingCart;
    const [userToken, setUserToken] = useState('');
    const likedProducts= props.favoriteList;
    const [like, setLike] = useState(false);

    useEffect(() => {
        axios.get('/products/productslist/'+ props.match.params.prodId).then(product => {
            setProductDetail(product.data)
        }).catch(err => {
            console.log(err)
        })
    },[])

    useEffect(() => {
        if(props.isUserLogin.user) {
            setUserToken(props.isUserLogin.user.token)
        }
    },[props.isUserLogin])

    useEffect(() => {
        if(props.isUserLogin.user) {
            setUserToken(props.isUserLogin.user.token)
        }
    },[])


    const addToCartHandler = (e,productId) => {
        e.preventDefault()
        if(props.isUserLogin.user) {
            props.dispatch(addProductToShoppingCart(productId,userToken))
        } else {
            props.history.push('/login')
        }        
    }

    const removeFromCartHandler = (e, productId) => {
        e.preventDefault();
        props.dispatch(removeProductFromShoppingCart(productId,userToken))
    }

    const toggleFavListHandler = (e, productId) => {
        if(props.isUserLogin.user) {
            if(likedProducts.includes(productId)) {
            e.preventDefault()
            props.dispatch(removeProductFromFavList(productId,userToken))
            setLike(prev => ({
                ...prev,
                [productId]: false
            }))
        } else {
            e.preventDefault()
            props.dispatch(addProductToFavList(productId,userToken))
            setLike(prev => ({
                ...prev,
                [productId]: true
            }))
        }
        } else {
            props.history.push('/login')
        }        
    }

    return (
        <>
            <div className={classes.Container}>
                {productDetail.map(prod => (
                    <ul key={prod._id} className={classes.List}>
                        <li className={classes.ImageContainer}><img src={prod.image} className={classes.Image}/></li>
                        <li className={classes.ListItem}>{prod.name}</li>
                        <li className={classes.ListItem}>$ {prod.price}</li>
                        <li className={classes.ListItem}>stock: {prod.stock}</li>
                        <button className={classes.FavButton} onClick={(e) =>toggleFavListHandler(e, prod._id)} >{likedProducts.includes(prod._id)? <FontAwesomeIcon icon={fasStar} /> : <FontAwesomeIcon icon={farStar} />}                            
                        </button>
                        {shoppingCartItems.includes(prod._id)? <button onClick={(e) => removeFromCartHandler(e, prod._id)} className={classes.Button} disabled={prod.stock === 0}>Remove product from shopping cart</button> :<button onClick={(e) => addToCartHandler(e,prod._id)} className={classes.Button} disabled={prod.stock === 0}>Add to cart</button>}
                    </ul>
                ))}
            </div>
        </>
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

export default withRouter(connect(mapStateToProps)(ProductDetail));
