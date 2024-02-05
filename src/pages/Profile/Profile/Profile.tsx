import React, { useState, useEffect } from 'react';
import './Profile.css';
import Sidebar from '../Sidebar/Sidebar';

const Profile = () => {
    // State to store user information
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [userId, setUserId] = useState(''); // State to store user ID

    // useEffect to fetch user data when userId changes
    useEffect(() => {
        if (!userId) return; // Exit early if userId is empty

        // Example API request (replace with your own API)
        fetch(`http://localhost:8080/users/getById/${userId}`)
            .then(response => response.json())
            .then(data => {
                setUser(data); // Update user state with fetched data
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, [userId]); // Re-run effect when userId changes

    // Function to update first name
    const updateFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prevState => ({
            ...prevState,
            firstName: e.target.value
        }));
    };

    // Function to update last name
    const updateLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prevState => ({
            ...prevState,
            lastName: e.target.value
        }));
    };

    // Function to update email
    const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prevState => ({
            ...prevState,
            email: e.target.value
        }));
    };

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Example code to update user data (replace with your own logic)
        fetch(`http://localhost:8080/users/update/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            console.log('User data updated:', data);
        })
        .catch(error => console.error('Error updating user data:', error));
    };

    return (
        <div className="profile container mt-5">
            <Sidebar />
            <h2 className="title">Profile Page</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={user.firstName}
                        onChange={updateFirstName}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={user.lastName}
                        onChange={updateLastName}
                    />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={user.email}
                        onChange={updateEmail}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default Profile;