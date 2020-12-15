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
    const [favList, setFavList] = useState([]);



    console.log('props.favoriteList', props.favoriteList)
    const likedItemsList = props.favoriteList;
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

    const toggleFavListHandler = (e, productId) => {
        if(props.favoriteList.includes(productId)) {
            e.preventDefault()
            props.dispatch(removeProductFromFavList(productId))
            setLike({[productId]: false})
        } else {
            e.preventDefault()
            props.dispatch(addProductToFavList(productId))
            setLike(prev => ({
                ...prev,
                [productId]: true
            }))
        }
    }

    return (
        <div className={classes.Container}>
            <FilterSort parentCallback={callbackHandler}/>
            <div className={classes.ProductContainer}>
                {products.map(product => (
                    <Link to={'/' + product._id} key={product._id} className={classes.Link}>
                        <ul id={product._id} className={classes.Product}>
                            <img src={product.image} alt="" className={classes.Image}/>
                            <li className={classes.List}>{product.name}</li>
                            <li className={classes.List}>${product.price}</li>
                            <button className={classes.Button} onClick={(e) =>toggleFavListHandler(e, product._id)} >{like[product._id]? <FontAwesomeIcon icon={fasStar} /> : <FontAwesomeIcon icon={farStar} />}                            
                            </button>
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
