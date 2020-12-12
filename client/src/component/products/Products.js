import React, {useState,useEffect} from 'react';
import axios from 'axios';
import ProductDetail from '../products/ProductDetail';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar as fasStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import classes from '../products/Products.module.css';
import FilterSort from '../ui/FilterSort';
import {connect} from 'react-redux';
import {addProductToFavList, removeProductFromFavList} from '../../action/action';

const Products = (props) => {
    const [products, setProducts] = useState([]);
    const [like, setLike] = useState(false);
    const [favList, setFavList] = useState([])

    useEffect(() => {
        axios.get('/products/productslist')
            .then(products => {
                // console.log(products)
                setProducts(products.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    const callbackHandler = (result) => {
        setProducts(result)
    }

    const addToFavListHandler = (e) => {
        console.log('e.target.id', e.target.value)
        e.preventDefault();
        // setLike(!like)
        // props.dispatch(addProductToFavList(e.target.value))
        if(like) {
            props.dispatch(addProductToFavList(e.target.value))
        } else {
            props.dispatch(removeProductFromFavList(e.target.value))
        }
    }

    let button;
    if(like) {
        button =(<FontAwesomeIcon icon={fasStar}/>)
    } else {
        button =(<FontAwesomeIcon icon={farStar}/>)
    }

    return (
        <div className={classes.Container}>
            <FilterSort parentCallback={callbackHandler}/>
            <div>
                {products.map(product => (
                    <Link to={'/' + product._id} key={product._id} >
                        <ul id={product._id}>
                            <img src={product.image} alt="" style={{height: '200px', width:'auto'}}/>
                            <li>{product.name}</li>
                            <li>$ {product.price}</li>
                            <button onClick={addToFavListHandler} value={product._id} className={classes.Button}>{button}</button>
                            {/* <button onClick={() => {
                                if(favList.includes(product)) {
                                    props.dispatch(removeProductFromFavList(product._id))
                                } else {
                                    props.dispatch(addProductToFavList(product._id))
                                }
                            }}>
                            {favList.includes(product) ? <FontAwesomeIcon icon={farStar}/> : <FontAwesomeIcon icon={fasStar}/>}
                            </button> */}
                        </ul>
                    </Link>
                ))}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        auth: state.auth,
        error: state.error.message,
        favoriteList:state.favoriteList.favoriteList
    }
}


export default connect(mapStateToProps)(Products);
