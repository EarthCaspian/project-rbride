import axiosInstance from '../utils/interceptors/axiosInterceptors'; 

class UserService {
  getRolesByUserId(userId: number) {
    return axiosInstance.get(`users/${userId}/roles`);
  }
}

export default new UserService();