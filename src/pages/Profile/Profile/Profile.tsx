import React, { useState, useEffect } from 'react';
import './Profile.css';
import Sidebar from '../Sidebar/Sidebar';
import TokenService from '../../../services/TokenService';
import * as Yup from 'yup';
import ProfileService from '../../../services/ProfileService';

// ProfileModel oluşturuldu
const ProfileModel = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
});

const Profile = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        const token = TokenService.getToken();
        if (token) {
            fetchUserDetails();
        }
    }, []);

    const fetchUserDetails = () => {
        ProfileService.getProfile() // Profil servisini kullanarak profil bilgilerini alıyoruz
        .then(data => {
            setUser(data);
        })
        .catch(error => console.error('Error fetching user data:', error));
};

    const updateEmail = (e : any) => {
        setUser(prevState => ({
            ...prevState,
            email: e.target.value
        }));
    };

    const updatePassword = (e : any) => {
        setUser(prevState => ({
            ...prevState,
            password: e.target.value
        }));
    };

    const handleSubmit = (e : any) => {
        e.preventDefault();
        ProfileModel.validate(user)
            .then(() => {
                ProfileService.updateProfile(user) // Profil servisini kullanarak profil bilgilerini güncelliyoruz
                    .then(data => {
                        console.log('User data updated:', data);
                    })
                    .catch(error => console.error('Error updating user data:', error));
            })
            .catch(error => console.error('Validation error:', error));
    };
    

    return (
        <div className="profile container mt-5">
            <Sidebar />
            <h2 className="title">Profile Page</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={user.email}
                        onChange={updateEmail}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={user.password}
                        onChange={updatePassword}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default Profile;