import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/admin.css';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [tweets, setTweets] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editingTweet, setEditingTweet] = useState(null);
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        fetchUsers();
        fetchTweets();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchTweets = async () => {
        try {
            const response = await axios.get('http://localhost:3000/tweets');
            setTweets(response.data);
        } catch (error) {
            console.error('Error fetching tweets:', error);
        }
    };

    const handleUpdateUser = async () => {
        try {
            await axios.put(`http://localhost:3000/users/${editingUser.user_id}`, editingUser);
            alert('User updated successfully');
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    const handleDeleteUser = async (user_id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/users/delete/${user_id}`);
           
                alert('User deleted successfully');
                fetchUsers();
            } 
         catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user: ' + error.message);
        }
    };

    const handleUpdateTweet = async () => {
        try {
            await axios.put(`http://localhost:3000/tweets/${editingTweet.tweet_id}`, editingTweet);
            alert('Tweet updated successfully');
            setEditingTweet(null);
            fetchTweets();
        } catch (error) {
            console.error('Error updating tweet:', error);
        }
    };

    const handleDeleteTweet = async (tweet_id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/tweets/delete/${tweet_id}`);
                alert('Tweet deleted successfully');
                fetchTweets();
                       
        } catch (error) {
            console.error('Error deleting tweet:', error);
            alert('Error deleting tweet');
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <button onClick={() => setActiveSection('users')}>User Management</button>
                <button onClick={() => setActiveSection('tweets')}>Tweet Management</button>
            </div>

            <div className="admin-content">
                {activeSection === 'users' && (
                    <div className="admin-section">
                        <h2>User Management</h2>
                        <ul>
                            {users.map(user => (
                                <li key={user.user_id}>
                                    {user.username} ({user.email})
                                    <div className="admin-buttons">
                                        <button onClick={() => setEditingUser(user)}>Edit</button>
                                        <button onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {editingUser && (
                            <div className="edit-form">
                                <h3>Edit User</h3>
                                <input
                                    type="text"
                                    value={editingUser.username}
                                    onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                                />
                                <input
                                    type="email"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editingUser.user_type}
                                    onChange={(e) => setEditingUser({ ...editingUser, user_type: e.target.value })}
                                />
                                <div className="edit-buttons">
                                    <button onClick={handleUpdateUser}>Save</button>
                                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeSection === 'tweets' && (
                    <div className="admin-section">
                        <h2>Tweet Management</h2>
                        <ul>
                            {tweets.map(tweet => (
                                <li key={tweet.tweet_id}>
                                    {tweet.text}
                                    <div className="admin-buttons">
                                        <button onClick={() => setEditingTweet(tweet)}>Edit</button>
                                        <button onClick={() => handleDeleteTweet(tweet.tweet_id)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {editingTweet && (
                            <div className="edit-form">
                                <h3>Edit Tweet</h3>
                                <textarea
                                    value={editingTweet.text}
                                    onChange={(e) => setEditingTweet({ ...editingTweet, text: e.target.value })}
                                />
                                <div className="edit-buttons">
                                    <button onClick={handleUpdateTweet}>Save</button>
                                    <button onClick={() => setEditingTweet(null)}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
