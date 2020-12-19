import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

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
            <Link to='/' >BACK</Link>
            <div>
                {productDetail.map(prod => (
                    <ul key={prod._id}>
                        <img src={prod.image} style={{height: '200px', width:'auto'}}/>
                        <li>{prod.name}</li>
                        <li>$ {prod.price}</li>
                        <button>Add to cart</button>
                    </ul>
                ))}
            </div>
        </>
    )
};

export default ProductDetail;
