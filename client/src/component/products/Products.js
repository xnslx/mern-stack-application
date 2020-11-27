import React, {useState,useEffect} from 'react';
import axios from 'axios';
import ProductDetail from '../products/ProductDetail';
import {Link} from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../products/Products.module.css';
import FilterSort from '../ui/FilterSort';

const Products = () => {
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

    return (
        <>
            <FilterSort />
            <div>
                {products.map(product => (
                    <Link to={'/' + product._id} key={product._id} >
                        <ul>
                            <img src={product.image} alt="" style={{height: '200px', width:'auto'}}/>
                            <li>{product.name}</li>
                            <li>$ {product.price}</li>
                        </ul>
                    </Link>
                ))}
            </div>
        </>
    )
};

export default Products;
