import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';


const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="user-info">
                <img src="user-avatar.jpg" alt="User Avatar" />
                <p>Username</p>
            </div>
            <div className="sidebar-links">
                <Link to="/profile">Profile</Link>
                <Link to="/orders">My Orders</Link>
            </div>
        </div>
    );
};

export default Sidebar;
