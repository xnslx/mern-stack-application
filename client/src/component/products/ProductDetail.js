import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import classes from './ProductDetail.module.css';

const ProductDetail = (props) => {
    // console.log('props', props)
    const [productDetail, setProductDetail] = useState([])

    useEffect(() => {
        axios.get('/products/productslist/'+ props.match.params.prodId).then(product => {
            console.log('product',product)
            setProductDetail(product.data)
        }).catch(err => {
            console.log(err)
        })
    },[])

    // console.log('productDetail', productDetail)
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
                        <button>Add to cart</button>
                    </ul>
                ))}
            </div>
        </>
    )
};

export default ProductDetail;
