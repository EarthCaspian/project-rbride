import React, { useState, useEffect } from 'react';
import './Orders.css';
import Sidebar from '../Sidebar/Sidebar';

const Orders = () => {
    // State to store user orders
    const [orders, setOrders] = useState([]);

    // useEffect to fetch user orders
    useEffect(() => {
        // Example API request (replace with your own API)
        fetch(`http://localhost:8080/orders/`)
            .then(response => response.json())
            .then(data => {
                setOrders(data); // Update orders state with fetched data
            })
            .catch(error => console.error('Error fetching user orders:', error));
    }, []); // Run once on component mount

    return (
        <div className="orders">
            <Sidebar />
            <h2>My Orders</h2>
            <ul>
                {orders.map((order, index) => (
                    <li key={index}>{order}</li>
                ))}
            </ul>
        </div>
    );
};

export default Orders;