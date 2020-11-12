import React, {useState} from 'react'

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    return (
        <div>
            <form action="">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </form>
            <form action="">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                    type="password" 
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </form>
        </div>
    )
};

export default ResetPassword;
