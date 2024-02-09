import { ProfileModel } from '../models/response/ProfileModel';
import axiosInstance from '../utils/interceptors/axiosInterceptors';
import { UpdateProfileRequest } from '../models/requests/UpdateProfileRequest';

class ProfileService {

    getProfile(token: string): Promise<ProfileModel> {
        return axiosInstance.get<ProfileModel>(`/users/getProfile`, {
            headers: {
                Authorization: `${token}`
            }
        })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
    }

    updateProfile(token: string, updateRequest: UpdateProfileRequest): Promise<ProfileModel> {
        return axiosInstance.put<ProfileModel>(`/users/updateProfile`, updateRequest, {
            headers: {
                Authorization: `${token}`
            }
        })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
    }
}

export default new ProfileService();