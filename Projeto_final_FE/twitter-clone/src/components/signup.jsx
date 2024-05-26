import React, { useState } from 'react';
import axios from 'axios';
import './sginup.css';

const SignUp = () => {
    // const [username, setusername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users', {
                // username,
                email,
                password
            });
            alert(response.data);
        } catch (error) {
            console.error('Error signing up', error);
            alert('Error signing up');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
                <button>Already have an account? Click here to login. </button>
            </form>
        </div>
    );
};

export default SignUp;
