// Login.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import './css/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setusername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/login', {
                username,
                email,
                password
            });
            
            const { user, token } = response.data;
            console.log(response.data);
            localStorage.setItem('user_id', user.user_id);
            localStorage.setItem('token', token);
            alert('Logged in successfully');
            
        } catch (error) {
            console.error('Error logging in', error);
            alert('Error logging in');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
            <div>
                    <label>Username</label>
                    <input
                        type="tex"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
