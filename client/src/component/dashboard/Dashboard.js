import React from 'react';
import {connect} from 'react-redux';

const Dashboard = (props) => {
    console.log('props', props)
    return (
        <div>
            <h3>Hey there, {props.auth.user.userName}</h3>
            <h5>You are logged in a full-stack MERN application.</h5>
            <button>LOGOUT</button>
        </div>
    )
};

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Dashboard);
