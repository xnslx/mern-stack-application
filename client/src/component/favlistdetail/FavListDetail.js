import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import axios from 'axios';
import {removeProductFromFavList} from '../../action/action';


const FavListDetail = (props) => {
    console.log('props',props)
    const [favList, setFavList] = useState([])
    useEffect(() => {
        axios.get('/products/favoritelist').then(result => {
            console.log(result.data)
            setFavList(result.data)
        }).catch(err => {
            console.log(err)
        })
    },[])

    const removeProductHandler = (productId) => {
        props.dispatch(removeProductFromFavList(productId))
    }
    return (
        <div>
            {favList.map(product => (
                <ul key={product._id}>
                    <img src={product.productId.image} alt="" style={{width: '160px', height: 'auto'}}/>
                    <li>{product.productId.name}</li>
                    <li>{product.productId.price}</li>
                    <button onClick={removeProductHandler}>Remove</button>
                    <button>Add to shopping cart</button>
                </ul>
            ))}
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

export default connect(mapStateToProps)(FavListDetail);
