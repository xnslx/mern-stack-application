import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';

const PrivateRoute = (props) => {
    console.log('props', props);
    const  isAuthenticated = props.auth.isAuthenticated;
    console.log('isAuthenticated', isAuthenticated);

    return (
        <Route 
            {...props.rest}
            render={props => {
                if(isAuthenticated === true) {
                    return <Component {...props}/>
                } else {
                    return (
                        <Redirect 
                            to ={{
                                path: '/login',
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    )
                }
            }}
        />
    )
};

const mapStateToProps = (state) => {
    // console.log('state', state)
    return {
        auth: state.auth,
        error: state.error.message
    }
}

export default connect(mapStateToProps)(PrivateRoute);
