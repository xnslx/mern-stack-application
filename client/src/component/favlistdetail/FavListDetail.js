import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import axios from 'axios';


const FavListDetail = (props) => {
    console.log('props',props)
    const [favList, setFavList] = useState([])
    useEffect(() => {
        axios.get('/products/favoritelist').then(result => {
            console.log(result)
            setFavList(result.data)
        }).catch(err => {
            console.log(err)
        })
    },[])
    return (
        <div>
            
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
