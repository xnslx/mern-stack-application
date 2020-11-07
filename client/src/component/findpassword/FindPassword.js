import React, {useState} from 'react'

const FindPassword = () => {
    const [email, setEmail] = useState('')
    return (
        <div>
        <p>Type your email to reset the password.</p>
            <form action="">
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

export default FindPassword;
