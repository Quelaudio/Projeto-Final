// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import './css/navbar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/Admin">Admin Area</Link>
                </li>
                <li>
                    <Link to="/tweet">Post a Tweet</Link>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
