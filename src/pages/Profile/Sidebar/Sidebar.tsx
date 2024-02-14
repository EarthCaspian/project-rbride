import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';


const Sidebar = () => {
    return (
        <div className="sidebar">

            <div className="sidebar-links">
                <Link to="/profile">Profile</Link>
                <Link to="/rentals">My Rentals</Link>
            </div>
        </div>
    );
};

export default Sidebar;
