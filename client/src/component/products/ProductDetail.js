import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import classes from './ProductDetail.module.css';
import {connect} from 'react-redux';
import {addProductToShoppingCart} from '../../action/action';

const ProductDetail = (props) => {
    const [productDetail, setProductDetail] = useState([])

    useEffect(() => {
        axios.get('/products/productslist/'+ props.match.params.prodId).then(product => {
            console.log('product',product)
            setProductDetail(product.data)
        }).catch(err => {
            console.log(err)
        })
    },[])

    const addToCartHandler = (e,productId) => {
        e.preventDefault()
        props.dispatch(addProductToShoppingCart(productId))
    }

    return (
        <>
            {/* <Link to='/' >BACK</Link> */}
            <div className={classes.Container}>
                {productDetail.map(prod => (
                    <ul key={prod._id} className={classes.List}>
                        <img src={prod.image} style={{height: 'auto', width:'300px'}} className={classes.Image}/>
                        <li>{prod.name}</li>
                        <li>$ {prod.price}</li>
                        <li>stock: {prod.stock}</li>
                        <button onClick={(e) => addToCartHandler(e,prod._id)}>Add to cart</button>
                    </ul>
                ))}
            </div>
        </>
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

export default connect(mapStateToProps)(ProductDetail);
