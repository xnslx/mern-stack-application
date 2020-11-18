import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {logoutUser} from '../../action/action';

const Dashboard = (props) => {

    const logoutHandler = () => {
        props.dispatch(logoutUser(props.history))
    }

    return (
        <div>
            <h3>Hey there, {props.auth.user.userName}</h3>
            <h5>You are logged in a full-stack MERN application.</h5>
            <button onClick={logoutHandler}>LOGOUT</button>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(withRouter(Dashboard));
