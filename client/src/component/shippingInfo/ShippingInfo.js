import React, {useState} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {saveShippingInformation} from '../../action/action';
import classes from './ShippingInfo.module.css';

const ShippingInfo = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');

    const currentUserShippingInfo = {
        firstName:firstName,
        lastName:lastName,
        address:address,
        city:city,
        state:state,
        zipcode:zipcode
    }

    const submitShippingInfoHandler = (e) => {
        e.preventDefault();
        props.dispatch(saveShippingInformation(currentUserShippingInfo))
        props.history.push('/payment')
    }


    return (
        <div className={classes.Container}>
            <h2>Shipping Information</h2>
            <form action="" onSubmit={submitShippingInfoHandler}>
                <div>
                    <p className={classes.LabelContainer}><label htmlFor="firstName" className={classes.Label}>First Name</label></p>
                    <input 
                        type="text"
                        id="firstName"
                        className={classes.Input}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <p className={classes.LabelContainer}><label htmlFor="lastName" className={classes.Label}>Last Name</label></p>
                    <input 
                        type="text"
                        id="lastName"
                        className={classes.Input}
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <p className={classes.LabelContainer}><label htmlFor="address" className={classes.Label}>Address</label></p>
                    <input 
                        type="text"
                        id="address"
                        className={classes.Input}
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <p className={classes.LabelContainer}><label htmlFor="city" className={classes.Label}>City</label></p>
                    <input 
                        type="text"
                        id="city"
                        className={classes.Input}
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </div>
                <div>
                    <p className={classes.LabelContainer}><label htmlFor="state" className={classes.Label}>State</label></p>
                    <input 
                        type="text"
                        id="state"
                        className={classes.Input}
                        value={state}
                        onChange={e => setState(e.target.value)}
                    />
                </div>
                <div>
                    <p className={classes.LabelContainer}><label htmlFor="zipcode" className={classes.Label}>Zipcode</label></p>
                    <input 
                        type="number"
                        id="zipcode"
                        className={classes.Input}
                        value={zipcode}
                        onChange={e => setZipcode(e.target.value)}
                    />
                </div>
                <button type="submit" className={classes.Button}>CONTINUE TO PAYMENT</button>
            </form>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        error: state.error.message,
        favoriteList:state.favoriteList.favoriteList,
        shoppingCart:state.shoppingCart.shoppingCart
    }
}

export default withRouter(connect(mapStateToProps)(ShippingInfo));
