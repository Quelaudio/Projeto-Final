// SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import './css/signup.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [user_type, setUser_type] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/signup', {
                username,
                email,
                password,
                user_type
            });

            console.log(response.data); // Log response data to inspect its structure

            if (response.data && response.data.user && response.data.token) {
                const { user, token } = response.data;

                localStorage.setItem('user_id', user.user_id);
                localStorage.setItem('token', token);
                alert('User created successfully');
            } else {
                console.error('Unexpected response format:', response.data);
                alert('Error signing up: Unexpected response format');
            }
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
                    <label>Username</label>
                    <input
                        type="text" // Corrected the input type
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                <div>
                    <label>Tipo de Usuario</label>
                    <input
                        type="text"
                        value={user_type}
                        onChange={(e) => setUser_type(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
