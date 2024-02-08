import axios from 'axios';
import { ProfileModel } from '../models/response/ProfileModel';
import axiosInstance from '../utils/interceptors/axiosInterceptors';


class ProfileService {

    getProfile(token: string): Promise<ProfileModel> {
        return axiosInstance.get<ProfileModel>(`/users/getProfile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
    }

    updateProfile(token: string, userData: { email: string, password: string }): Promise<ProfileModel> {
        return axiosInstance.put<ProfileModel>(`/users/update`, userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
    }
}

export default new ProfileService();