import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {retrievePassword} from '../../action/action';
import {Link} from 'react-router-dom';

const FindPassword = (props) => {
    console.log('props', props)
    const [email, setEmail] = useState('');
    const [error, setError] = useState({});

    const verifiedEmail = {
        email: email
    }

    useEffect(() => {
        getErrorMessage()
    }, [props.error.message])

    const getErrorMessage = () => {
        if(props.error !== null) {
        setError(props.error);
        }
    }

    console.log('error', error)

    const findPasswordHandler = (e) => {
        e.preventDefault();
        props.dispatch(retrievePassword(verifiedEmail))
    }


    return (
        <div>
        <Link to='/' >BACK TO HOME</Link>
        {/* {error.message !== null ? <ul>{error.message}</ul> : null} */}
        {props.error.hasError === true && (
            <div>
                <p>{error.message}</p>
            </div>
        )}
        {props.backendData === 'Email sent!' && (
            <div>
                <p>Please check your email to reset password!</p>
            </div>
        )}
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
    console.log('state', state)
    return {
        auth: state.auth,
        error: state.error,
        backendData: state.backendData.backendData
    }
}

export default connect(mapStateToProps)(FindPassword);
