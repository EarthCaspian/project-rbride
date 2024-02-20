import React, { useState, useEffect, ChangeEvent } from 'react';
import './Profile.css';
import Sidebar from '../Sidebar/Sidebar';
import TokenService from '../../../services/TokenService';
import * as Yup from 'yup';
import ProfileService from '../../../services/ProfileService';

const ProfileSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(1, 'Please enter your current or new password'),
});

const Profile = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const token = TokenService.getToken();
        if (token) {
            fetchUserDetails();
        }
    }, []);

    const fetchUserDetails = () => {
        const token = TokenService.getToken();

        if (token) {
            ProfileService.getProfile(token)
                .then(data => {
                    setUser({ email: data.email, password: '' });
                })
                .catch(error => {
                    console.error('Unable to fetch user data:', error);
                    setError('Unable to fetch user data. Please try again later.');
                });
        }
    };

    const updateInputValue = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        const { value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        ProfileSchema.validate(user)
            .then(() => {
                const token = TokenService.getToken();
                if (token) {
                    ProfileService.updateProfile(token, user)
                        .then(updatedData => {
                            console.log('User data successfully updated:', updatedData);
                        })
                        .catch(error => {
                            console.error('Unable to update user data:', error);
                            setError('Unable to update user data. Please try again later.');
                        });
                }
            })
            .catch(error => {
                console.error('Validation error:', error);
                setError('Please enter a valid email address and password.');
            });
    };

    return (
        <div className="profile container mt-5">
            <Sidebar />
            <h2 className="profile-title">Profile Page</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={user.email}
                        onChange={e => updateInputValue(e, 'email')}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={user.password}
                        onChange={e => updateInputValue(e, 'password')}
                    />
                </div>
                <button type="submit" className="submit-btn btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default Profile;