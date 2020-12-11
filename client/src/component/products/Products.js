import React, {useState,useEffect} from 'react';
import axios from 'axios';
import ProductDetail from '../products/ProductDetail';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../products/Products.module.css';
import FilterSort from '../ui/FilterSort';
import {connect} from 'react-redux';
import {addProductToFavList, removeProductFromFavList} from '../../action/action';

const Products = (props) => {
    const [products, setProducts] = useState([]);

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

    const addToFavListHandler = (e, productId) => {
        console.log('e.target.id', e.target.value)
        e.preventDefault();
        props.dispatch(addProductToFavList(e.target.value))

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
                            <button onClick={addToFavListHandler} value={product._id}>Favorite</button>
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
