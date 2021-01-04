import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {saveShippingInformation} from '../../action/action';

const ShippingInfo = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');

    const currentUser = {
        firstName:firstName,
        lastName:lastName,
        address:address,
        city:city,
        state:state,
        zipcode:zipcode
    }

    const submitShippingInfoHandler = (e) => {
        e.preventDefault();
        props.dispatch(saveShippingInformation(currentUser))
        props.history.push('/payment')
    }


    return (
        <div>
            <h2>Shipping Information</h2>
            <form action="" onSubmit={submitShippingInfoHandler}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input 
                        type="text"
                        id="address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input 
                        type="text"
                        id="city"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input 
                        type="text"
                        id="state"
                        value={state}
                        onChange={e => setState(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="zipcode">Zipcode</label>
                    <input 
                        type="number"
                        id="zipcode"
                        value={zipcode}
                        onChange={e => setZipcode(e.target.value)}
                    />
                </div>
                <button type="submit">CONTINUE TO PAYMENT</button>
            </form>
        </div>
    )
};

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        auth: state.auth,
        error: state.error.message,
        favoriteList:state.favoriteList.favoriteList,
        shoppingCart:state.shoppingCart.shoppingCart
    }
}

export default withRouter(connect(mapStateToProps)(ShippingInfo));
