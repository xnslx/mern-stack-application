import React, {useState} from 'react'

const FindPassword = () => {
    const [email, setEmail] = useState('')
    return (
        <div>
            <form action="">
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    id="email"
                    value={email}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default FindPassword;
