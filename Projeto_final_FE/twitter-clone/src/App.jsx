// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Feed from './components/feed';
import Navbar from './components/navbar';
import SignUp from './components/signup';
import TweetForm from './components/tweetForm';
import Login from './components/login';
import axios from 'axios'; // Import Axios here

const getToken = () => {
    return localStorage.getItem('token');
};


axios.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);




const App = () => {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <div className="main-content">
                    
                    <div className="main">
                        <Routes>
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                           
                            <Route path="/tweet" element={<TweetForm />} />
                            <Route path="/" element={<Feed />} />
                        </Routes>
                    </div>
                   
                </div>
            </div>
        </Router>
    );
};

export default App;
