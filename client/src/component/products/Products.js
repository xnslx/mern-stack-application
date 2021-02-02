import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar as fasStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import classes from '../products/Products.module.css';
import FilterSort from '../ui/FilterSort';
import {connect} from 'react-redux';
import {addProductToFavList, removeProductFromFavList} from '../../action/action';
import {withRouter} from 'react-router';

const Products = (props) => {
    const [products, setProducts] = useState([]);
    const [like, setLike] = useState(false);
    const [userToken, setUserToken] = useState('')

    const likedProducts= props.favoriteList;

    
    useEffect(() => {
        axios.get('/products/productslist')
            .then(products => {
                setProducts(products.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if(props.isUserLogin.user) {
            setUserToken(props.isUserLogin.user.token)
        }
    },[props.isUserLogin.user])


    const callbackHandler = (result) => {
        setProducts(result)
    }

    const toggleFavListHandler = (e, productId) => {
        if(props.isUserLogin.user) {
            if(likedProducts.includes(productId)) {
            e.preventDefault()
            props.dispatch(removeProductFromFavList(productId, userToken))
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
        <div className={classes.Container}>
            <FilterSort parentCallback={callbackHandler}/>
            <div className={classes.ProductContainer}>
                {products.map(product => (
                    <div key={product._id} className={classes.Link}>
                        <ul id={product._id} className={classes.Product}>
                            <Link to={'/' + product._id}><img src={product.image} alt="" className={classes.Image} /></Link>
                            <li className={classes.List}>{product.name}</li>
                            <li className={classes.List}>${product.price}</li>
                            {product.stock===0 ? <h5 className={classes.Text}>Out of stock</h5> :''}
                            <button className={classes.Button} onClick={(e) =>toggleFavListHandler(e, product._id)} >{likedProducts.includes(product._id)? <FontAwesomeIcon icon={fasStar} /> : <FontAwesomeIcon icon={farStar} />}                            
                            </button>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        isUserLogin:state.isUserLogin,
        auth: state.auth,
        error: state.error.message,
        favoriteList:state.favoriteList.favoriteList
    }
}


export default connect(mapStateToProps)(withRouter(Products));
