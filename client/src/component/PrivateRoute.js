import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
// import Dashboard from './dashboard/Dashboard';
import Products from './products/Products';

const PrivateRoute = ({component:Component, auth:auth, ...rest}) => {
    // console.log('props', props);
    // const  isAuthenticated = props.auth.isAuthenticated;
    // console.log('isAuthenticated', isAuthenticated);

    return (
        <Route 
            {...rest}
            render={props => {
                if(auth.isAuthenticated === true || localStorage.getItem('jwtToken')) {
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
