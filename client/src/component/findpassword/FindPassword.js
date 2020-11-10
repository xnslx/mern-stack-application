import React, {useState} from 'react';
import {connect} from 'react-redux';
import {retrievePassword} from '../../action/action';

const FindPassword = (props) => {
    const [email, setEmail] = useState('');

    const findPasswordHandler = (e, email) => {
        e.preventDefault();
        props.dispatch(retrievePassword(email))
    }
    return (
        <div>
        <p>Type your email to reset the password.</p>
            <form action="" onSubmit={findPasswordHandler}>
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        error: state.error.message
    }
}

export default connect(mapStateToProps)(FindPassword);
