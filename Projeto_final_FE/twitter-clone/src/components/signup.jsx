// SignUp.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import './css/signup.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setusername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users', {
                username,
                email,
                password
            });
            const { user_id } = response.data;
            localStorage.setItem('user_id', user_id);
            alert('User created successfully');
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
                <div>
                    <label>Username</label>
                    <input
                        type="tex"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        required
                    />
                </div>
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
                
            </form>
        </div>
    );
};

export default SignUp;