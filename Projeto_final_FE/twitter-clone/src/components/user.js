// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        axios.get('/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/users', { username, email, password })
            .then(response => {
                setUsers([...users, response.data]);
                setUsername('');
                setEmail('');
                setPassword('');
            })
            .catch(error => {
                console.error('There was an error creating the user!', error);
            });
    };

    return (
        <div>
            <h1>Users</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Create User</button>
            </form>
            <ul>
                {users.map(user => (
                    <li key={user.user_id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default User;
