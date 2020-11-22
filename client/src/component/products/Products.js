import React, {useState,useEffect} from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([])

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
        <div>
            {products.map(product => (
                <ul key={product._id}>
                    <img src={product.image} alt=""/>
                    <li>{product.name}</li>
                    <li>$ {product.price}</li>
                </ul>
            ))}
        </div>
    )
};

export default Products;
