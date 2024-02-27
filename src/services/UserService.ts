import axiosInstance from '../utils/interceptors/axiosInterceptors'; 
import RoleService from './RoleService';

class UserService {
  getRolesByUserId(userId: number) {
    return axiosInstance.get(`users/${userId}/roles`)
    .then(response => {
      const roleName = response.data[0].name;
      const isAdmin = roleName === 'admin';
      RoleService.setRole(isAdmin ? 'admin' : 'user');
    })
    .catch(error => {
      console.log(error);
    });;
  }
}

export default new UserService();